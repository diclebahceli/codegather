import axios from "axios";
import {TestCase} from "../models/TestCase";
import {BACKEND_URL} from "../utils/config";
import {ExtractErrorMessage} from "./AuthService";

const testcaseEndPoint = BACKEND_URL + "/TestCase";

export async function CreateTestCase(testCase: TestCase): Promise<{data: TestCase | null, error: string | null}> {
  const {input, output, questionId} = testCase;
  try {
    const response = await axios.post(`${testcaseEndPoint}/CreateTestCase`, {questionId, input, output});
    if (response.status === 200) {
      return {data: response.data.testCase as TestCase, error: null};
    } else {
      return {data: null, error: ExtractErrorMessage(response)};
    }

  } catch (error) {
    return {data: null, error: ExtractErrorMessage(error)};
  }
}

export async function UpdateTestCase(testCase: TestCase): Promise<{data: TestCase | null, error: string | null}> {
  const {input, output, id} = testCase;
  try {
    const response = await axios.put(`${testcaseEndPoint}/UpdateTestCase`, {id, input, output});
    if (response.status === 200) {
      return {data: response.data.testCase as TestCase, error: null};
    } else {
      return {data: null, error: ExtractErrorMessage(response)};
    }

  } catch (error) {
    return {data: null, error: ExtractErrorMessage(error)};
  }
}

export async function DeleteTestCase(id: string) {
  try {
    const response = await axios.delete(`${testcaseEndPoint}/DeleteTestCase?TestCaseId=${id}`);
    if (response.status === 200) {
      return {success: true, error: null};
    } else {
      return {success: false, error: ExtractErrorMessage(response)};
    }

  } catch (error) {
    return {success: false, error: ExtractErrorMessage(error)};
  }
}

export async function GetTestCaseById(id: string): Promise<{error: string | null, data: TestCase | null}> {
  try {
    const response = await axios.get(`${testcaseEndPoint}/GetById?Id=${id}`);
    if (response.status === 200) {
      return {error: null, data: response.data.testCase as TestCase};
    } else {
      return {data: null, error: ExtractErrorMessage(response)};
    }
  } catch (error) {
    return {data: null, error: ExtractErrorMessage(error)};
  }
}

export async function GetTestCasesByQuestionId(questionId: string): Promise<{error: string | null, data: TestCase[] | null}>{
  try {
    const response = await axios.get(`${testcaseEndPoint}/GetByQuestionId?QuestionId=${questionId}`);
    if (response.status === 200) {
      return {error: null, data: response.data.testCases as TestCase[]};
    } else {
      return {data: null, error: ExtractErrorMessage(response)};
    }

  } catch (error) {
    return {data: null, error: ExtractErrorMessage(error)};
  }
}
