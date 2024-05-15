import axios from "axios";
import {RunRequest} from "../models/RunRequest";
import {BACKEND_URL} from "../utils/config";
import {ExtractErrorMessage} from "./AuthService";
import {RunResult} from "../models/RunResult";

const submissionEndPoint = BACKEND_URL + "/submission";

export async function RunCode(requestData: RunRequest): Promise<{data: RunResult | null; error: string | null}> {
  const {userId, questionId, code, languageId} = requestData;
  try {
    const response = await axios.post(`${submissionEndPoint}/Run`, {userId, questionId, code, languageId});
    if (response.status != 200) {
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.runResult as RunResult, error: null};
  } catch (e: Error | any) {
    return {data: null, error: ExtractErrorMessage(e)};
  }
}

export async function SubmitCode(requestData: RunRequest): Promise<{data: RunResult | null; error: string | null}> {
  const {userId, questionId, code, languageId} = requestData;
  try {
    const response = await axios.post(`${submissionEndPoint}/Submit`, {userId, questionId, code, languageId});
    if (response.status != 200) {
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data as RunResult, error: null};
  } catch (e: Error | any) {
    return {data: null, error: ExtractErrorMessage(e)};
  }
}
