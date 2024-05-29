import {useState} from "react";
import {RunCode, RunRequest, SubmitCode} from "@/app/services/SubmissionService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import toast from "react-hot-toast";
import {RunResult} from "@/app/models/RunResult";
import {Submission} from "../models/Submission";

const useCodeExecution = (questionId: string, code: string) => {
  const [result, setResult] = useState<RunResult>({
    stdout: "",
    stderr: "",
    time: "",
    memory: "",
    token: "",
  });

  const [submission, setSubmission] = useState<Submission>({
    id: "",
    questionId: "",
    userId: "",
    submissionTime: "",
    code: "",
    successRate: 0,
    compileTime: 0,
    memoryUsage: 0,
    score: 0,
    errorFree: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const resetObjcets = () => {
    setResult({stdout: "", stderr: "", time: "", memory: "", token: ""});
    setSubmission({
      id: "",
      questionId: "",
      userId: "",
      submissionTime: "",
      code: "",
      successRate: 0,
      compileTime: 0,
      memoryUsage: 0,
      score: 0,
      errorFree: true,
    });
  }

  const handleRun = async () => {
    setIsLoading(true);
    resetObjcets();
    try {
      const userId = getWithExpiry("userId");
      if (!userId) {
        toast.error("Invalid User");
        return;
      }
      const runReq: RunRequest = {
        userId,
        questionId,
        code,
        languageId: 71,
      };

      const res = await RunCode(runReq);
      if (res.error || !res.data) {
        toast.error(res.error);
        return;
      }
      setResult(res.data);
    } catch (e: Error | any) {
      toast.error(e.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    resetObjcets();
    setIsLoading(true);
    try {
      const userId = getWithExpiry("userId");
      if (!userId) {
        toast.error("Invalid User");
        return;
      }
      const runReq: RunRequest = {
        userId,
        questionId,
        code,
        languageId: 71,
      };

      const res = await SubmitCode(runReq);
      if (res.error || !res.data) {
        toast.error(res.error);
        return;
      }
      if (!res.data.errorFree) {
        setResult({ stdout: "", stderr: res.data.errorMessage as string, time: "", memory: "", token: "" });
      }
      setSubmission(res.data);
    } catch (e: Error | any) {
      toast.error(e.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  return {result, submission, isLoading, handleRun, handleSubmit};
};

export default useCodeExecution;
