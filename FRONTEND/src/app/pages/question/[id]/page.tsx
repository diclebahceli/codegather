"use client";
import React, {useEffect, useState} from "react";
import AceEditorComponent from "@/app/components/ace_editor/AceEditor";
import {GetQuestionById} from "@/app/services/QuestionService";
import Card from "@/app/components/card/Card";
import toast from "react-hot-toast";
import {Question} from "@/app/models/Question";
import {RunCode} from "@/app/services/SubmissionService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import {RunRequest} from "@/app/models/RunRequest";
import {RunResult} from "@/app/models/RunResult";

export default function EditorPage({params}: {params: {id: string}}) {
  const [question, setQuestion] = useState<Question>(
    {name: "", description: "", starterCode: "", id: "", testCases: [], submissions: [], competitionId: ""}
  );

  const [code, setCode] = useState<string>(question.starterCode);

  const [result, setResult] = useState<RunResult>({stdout: "", stderr: "", time: "", memory: "", token: ""});

  useEffect(() => {
    const fetchdata = async () => {
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
    }

    fetchdata();
  }, [])

  const handleRun = async () => {
    try {
      const userId = getWithExpiry("userId");
      if (!userId) {
        toast.error("Invalid User");
        return;
      }
      const runReq: RunRequest =
      {
        userId: userId, questionId: question.id
        , code: code, languageId: 71
      };

      const result = await RunCode(runReq)
      if (result.error || !result.data) {
        toast.error(result.error)
        return;
      }
      setResult(result.data);
    } catch (e: Error | any) {
      toast.error(e.message);
    }
  }

  const handleSubmit = () => {
  }

  const onValueChange = (newCode: string) => {
    setCode(newCode);
  }

  return (
    <div className="bg-dark p-3" style={{height: "92vh"}}>
      <div className="d-flex flex-row h-100 justify-content-evenly">
        <div id="explanation" className="col-6 p-3">
          <Card>
            <div className="h-100 m-3 d-flex flex-column">
              <h1 className="fs-1 text-white mb-5">{question.name}</h1>
              <div>
                <p className="text-white lh-lg">{question.description}</p>
              </div>

            </div>
          </Card>

        </div>
        <div className="p-3 pe-0 ps-0 col-6 d-flex flex-column">
          <div style={{height: "30em"}}>
            <AceEditorComponent onValueChange={onValueChange} defaultValue={question.starterCode} />
          </div>
          <div className="flex-grow-1 mt-2">
            <Card>
              <div className="d-flex flex-column  p-5 pt-2 pe-4">
                <div className="d-flex flex-row ">
                  <div className="text-white fs-4 align-self-start ">Results</div>
                  <div className="flex-grow-1"></div>
                  <button onClick={handleRun} className="btn btn-dark fs-5 me-3">Run</button>
                  <button className="btn btn-green fs-5">Submit</button>
                </div>
                <div className="d-flex flex-column mt-3">
                  <div className="text-white fs-5">Output: {result.stdout}</div>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>

  );
}
