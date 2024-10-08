"use client";
import React, {useState, useEffect} from "react";
import AceEditorComponent from "@/app/components/ace_editor/AceEditor";
import {GetQuestionById} from "@/app/services/QuestionService";
import Card from "@/app/components/card/Card";
import toast from "react-hot-toast";
import {DefaultQuestion, Question} from "@/app/models/Question";
import CompetitionProtected from "@/app/components/competition_protected/CompetitionProtected";
import ResultsSection from "../components/ResultSection";
import {Button, Dropdown, DropdownMenu, DropdownToggle, Spinner} from "reactstrap";
import useCodeExecution from "@/app/hooks/useCodeExecution";
import {Submission} from "@/app/models/Submission";
import {GetLastSubmissionForQuestion, GetUsersSubmissionsForQuestion} from "@/app/services/SubmissionService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import YourSubmissionOption from "../components/YourSubmissionOption";
import {GetCompetitionById} from "@/app/services/CompetitionService";
import {useRouter} from "next/navigation";
import FullPageLoader from "@/app/components/full_page_loader/FullPageLoader";
import Link from "next/link";

export default function EditorPage({params}: {params: {id: string}}) {
  const [question, setQuestion] = useState<Question>(DefaultQuestion);

  const {name, description, testCases, competitionId} = question;

  const [userSubmissions, setUserSubmissions] = useState<Submission[]>([]);

  const [code, setCode] = useState("");

  const {result, isLoading, handleSubmit, submission, handleRun} = useCodeExecution(question.id, code);

  const router = useRouter();


  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const result = await GetQuestionById(params.id);
        if (result.error || !result.data) {
          toast.error(result.error);
          return;
        }
        setQuestion(result.data);
        fetchCompetition(result.data.competitionId);
        setCode(result.data.starterCode);
      } catch (e: Error | any) {
        toast.error(e.message);
        return;
      }
    };

    const fetchCompetition = async (id: string) => {
      if (!id) return;
      try {
        const result = await GetCompetitionById(id);
        if (result.error || !result.data) {
          toast.error(result.error);
          return;
        }
        if (new Date(result.data.startDate) > new Date()) {
          router.replace("/pages/competitionDetail/" + id);
        }
      } catch (e: Error | any) {
        toast.error(e.message);
        return;
      }
    }


    const fetchLastSubmission = async () => {
      try {
        const result = await GetLastSubmissionForQuestion(params.id, getWithExpiry("userId") as string);
        if (result.error) {
          toast.error(result.error);
          return;
        }
        if (!result.data) {
          return;
        }
        setCode(result.data.code);

      } catch (e: Error | any) {
        toast.error(e.message);
        return;
      }

    }
    fetchQuestion();
    fetchLastSubmission();
  }, [params.id]);

  useEffect(() => {

    const fetchSubmissions = async () => {
      try {
        const result = await GetUsersSubmissionsForQuestion(params.id, getWithExpiry("userId") as string);
        if (result.error || !result.data) {
          toast.error(result.error);
          return;
        }
        setUserSubmissions(result.data);

      } catch (e: Error | any) {
        toast.error(e.message);
        return;
      }
    }

    fetchSubmissions();
  }, [params.id, submission])

  const resetCode = () => {
    setCode(question.starterCode);
  }
  const onValueChange = (newCode: string) => {
    setCode(newCode);
  };


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  if (code === "") {
    return (
      <div className="h-100">
        <FullPageLoader></FullPageLoader>
      </div>
    )
  }

  return (
    <CompetitionProtected compId={competitionId}>
      <div className="bg-dark p-3 h-100">
        <div className="d-flex flex-row h-100 justify-content-evenly">
          <div className="d-flex flex-column col-6" >
            <div className=" w-100 d-flex flex-row px-3">
              <Link href={`/pages/question/${question.id}/comments/`} className="btn btn-green text-dark mb-2">Comments</Link>
              <div className="flex-grow-1"></div>
              <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={"down"} className="mb-2 mx-2">
                <DropdownToggle className="text-white" caret color="grey" disabled={userSubmissions.length == 0}>Your Submissions</DropdownToggle>
                <DropdownMenu >
                  {userSubmissions.length != 0 && userSubmissions.map((submission) => (
                    <YourSubmissionOption
                      key={submission.id}
                      submission={submission}
                      onClicked={() => onValueChange(submission.code)}
                    />
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button color="green mb-2" onClick={resetCode}> Reset Code</Button>
            </div>
            <div id="explanation" className="col-12 px-3 py-1 flex-grow-1">
              <Card>
                <div className="h-100 m-3 d-flex flex-column">
                  <h1 className="fs-1 text-white mb-5">{name}</h1>
                  <div>
                    <p className="text-white lh-lg">{description}</p>
                  </div>
                </div>
              </Card>
            </div>

          </div>
          <div className="p-3 pe-0 ps-0 col-6 d-flex flex-column">
            <div style={{height: "26em"}}>
              <AceEditorComponent
                onValueChange={onValueChange}
                defaultValue={code}
              />
            </div>
            <div className="flex-grow-1 mt-2">
              <Card>
                <div className="d-flex flex-column p-5 pt-2 pe-4 h-100">
                  <div className="d-flex flex-row">
                    <div className="text-white fs-4 align-self-start">
                      Results
                    </div>
                    <div className="flex-grow-1"></div>
                    <button
                      onClick={handleRun}
                      className="btn btn-dark fs-5 me-3"
                    >
                      Run
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="btn btn-green fs-5"
                    >
                      Submit
                    </button>
                  </div>
                  {isLoading && <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <Spinner />
                  </div>}
                  {!isLoading && (
                    <ResultsSection
                      result={result}
                      submission={submission}
                      testCase={testCases[0]}
                    />
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </CompetitionProtected>
  );
}
