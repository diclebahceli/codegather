import {useState} from "react";
import {RunCode, SubmitCode} from "@/app/services/SubmissionService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import toast from "react-hot-toast";
import {DefaultRunResult, RunResult} from "@/app/models/RunResult";
import {DefaultSubmission, Submission} from "../models/Submission";
import {RunRequest} from "../models/RunRequest";

const useCodeExecution = (questionId: string, code: string) => {
  const [result, setResult] = useState<RunResult>(DefaultRunResult);

  const [submission, setSubmission] = useState<Submission>(DefaultSubmission);

  const [isLoading, setIsLoading] = useState(false);

  const resetObjcets = () => {
    setResult(DefaultRunResult);
    setSubmission(DefaultSubmission);
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
        setResult({stdout: "", stderr: res.data.errorMessage as string, time: "", memory: "", token: ""});
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
