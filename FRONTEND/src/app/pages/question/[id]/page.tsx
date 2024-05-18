"use client";
import React, {useEffect, useState} from "react";
import AceEditorComponent from "@/app/components/ace_editor/AceEditor";
import {GetQuestionById} from "@/app/services/QuestionService";
import Card from "@/app/components/card/Card";
import toast from "react-hot-toast";
import {Question} from "@/app/models/Question";
import {RunCode, SubmitCode} from "@/app/services/SubmissionService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import {RunRequest} from "@/app/models/RunRequest";
import {RunResult} from "@/app/models/RunResult";
import {Submission} from "@/app/models/Submission";

export default function EditorPage({params}: {params: {id: string}}) {
  const [question, setQuestion] = useState<Question>(
    {name: "", description: "", starterCode: "", id: "", testCases: [], submissions: [], competitionId: ""}
  );

  const [code, setCode] = useState<string>(question.starterCode);

  const [result, setResult] = useState<RunResult>({stdout: "", stderr: "", time: "", memory: "", token: ""});
  const [submission, setSubmission] = useState<Submission>(
    {id: "", questionId: "", userId: "", submissionTime: "", code: "", successRate: 0, compileTime: 0, memoryUsage: 0}
  );

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
    setResult({stdout: "", stderr: "", time: "", memory: "", token: ""});
    setSubmission(
      {id: "", questionId: "", userId: "", submissionTime: "", code: "", successRate: 0, compileTime: 0, memoryUsage: 0}
    );
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

      const res = await RunCode(runReq)
      if (res.error || !res.data) {
        toast.error(res.error)
        return;
      }
      setResult(res.data);
    } catch (e: Error | any) {
      toast.error(e.message);
    }
  }

  const handleSubmit = async () => {
    setResult({stdout: "", stderr: "", time: "", memory: "", token: ""});
    setSubmission(
      {id: "", questionId: "", userId: "", submissionTime: "", code: "", successRate: 0, compileTime: 0, memoryUsage: 0}
    );
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

      const res = await SubmitCode(runReq)
      if (res.error || !res.data) {
        toast.error(res.error)
        return;
      }
      setSubmission(res.data);
    } catch (e: Error | any) {
      toast.error(e.message);
    }
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
              <div className="d-flex flex-column  p-5 pt-2 pe-4 h-100">
                <div className="d-flex flex-row ">
                  <div className="text-white fs-4 align-self-start ">Results</div>
                  <div className="flex-grow-1"></div>
                  <button onClick={handleRun} className="btn btn-dark fs-5 me-3">Run</button>
                  <button onClick={handleSubmit} className="btn btn-green fs-5">Submit</button>
                </div>
                <div className="my-2">
                  {result.stderr && <div className="text-white fw-bold ">Compile Error:
                    <span className="text-danger opacity-75"> {result.stderr}</span></div>}
                  {result.stdout &&
                    <div className="d-flex flex-column h-100">
                      <div className="d-flex flex-row">
                        <div className="text-white me-3 fw-bold"> Input :
                          <span className="mx-2 fw-normal opacity-75">{question.testCases[0].input}</span>
                        </div>
                        <div className="text-white me-3 fw-bold"> Expected Output :
                          <span className=" mx-2 fw-normal opacity-75">
                            {question.testCases[0].output}
                          </span>
                        </div>
                      </div>
                      {result.stderr && <div className="text-white"> Compile Error: {result.stderr} </div>}

                      <div className="py-3">
                        {question.testCases[0].output != result.stdout && !result.stderr ?
                          <div className="text-danger fw-bold"> Your Output: {result.stdout} </div>
                          :
                          <div className="text-green fw-bold"> Your Output:
                            <span className="mx-2 fw-normal opacity-75">
                              {result.stdout}
                            </span>
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
                {submission.id != "" && <div className="text-white fw-bold">
                  Success Rate: <span className="text-white m-2">{submission.successRate * 100}%</span>
                </div>}
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>

  );
}
