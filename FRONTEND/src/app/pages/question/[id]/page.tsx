"use client";
import React, {useState, useEffect} from "react";
import AceEditorComponent from "@/app/components/ace_editor/AceEditor";
import {GetQuestionById} from "@/app/services/QuestionService";
import Card from "@/app/components/card/Card";
import toast from "react-hot-toast";
import {Question} from "@/app/models/Question";
import CompetitionProtected from "@/app/components/competition_protected/CompetitionProtected";
import ResultsSection from "../components/ResultSection";
import {Spinner} from "reactstrap";
import useCodeExecution from "@/app/hooks/useCodeExecution";

export default function EditorPage({params}: {params: {id: string}}) {
  const [question, setQuestion] = useState<Question>({
    name: "",
    description: "",
    starterCode: "",
    id: "",
    testCases: [],
    submissions: [],
    competitionId: "",
  });

  const [code, setCode] = useState("");

  const {result, isLoading, handleSubmit, submission, handleRun} = useCodeExecution(question.id, code);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetQuestionById(params.id);
        if (result.error || !result.data) {
          toast.error(result.error);
          return;
        }
        setQuestion(result.data);
        setCode(result.data.starterCode);
      } catch (e: Error | any) {
        toast.error(e.message);
        return;
      }
    };

    fetchData();
  }, [params.id]);

  const onValueChange = (newCode: string) => {
    setCode(newCode);
  };

  const {name, description, starterCode, testCases, competitionId} = question;

  return (
    <CompetitionProtected compId={competitionId}>
      <div className="bg-dark p-3" style={{height: "92vh"}}>
        <div className="d-flex flex-row h-100 justify-content-evenly">
          <div id="explanation" className="col-6 p-3">
            <Card>
              <div className="h-100 m-3 d-flex flex-column">
                <h1 className="fs-1 text-white mb-5">{name}</h1>
                <div>
                  <p className="text-white lh-lg">{description}</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="p-3 pe-0 ps-0 col-6 d-flex flex-column">
            <div style={{height: "30em"}}>
              <AceEditorComponent
                onValueChange={onValueChange}
                defaultValue={starterCode}
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
