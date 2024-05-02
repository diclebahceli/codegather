import axios from "axios";
import {Competition} from "../models/Competition";
import {Question} from "../models/Question";
import {BACKEND_URL} from "../utils/config";
import {ExtractErrorMessage} from "./AuthService";

const questionEndPoint = BACKEND_URL + "/question";

export async function GetAllQuestions(): Promise<{data: Question[] | null; error: string | null}> {
  try {
    const response = await axios.get(`${questionEndPoint}/getAll`);
    if (response.status != 200) {
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.questions as Question[], error: null};

  } catch (e: Error | any) {
    return {data: null, error: ExtractErrorMessage(e)};
  }
};

export async function GetQuestionById(questionId: string): Promise<{data: Question | null; error: string | null}> {
  try {
    const response = await axios.get(`${questionEndPoint}/GetById?Id=${questionId}`);

    if (response.status != 200) {
      return {data: null, error: ExtractErrorMessage(response)};
    }
    const question = response.data.question as Question;
    question.submissions = response.data.submissions;
    question.testCases = response.data.testCases;
    return {data: question, error: null};
  } catch (e: Error | any) {
    return {data: null, error: ExtractErrorMessage(e)};
  }
}


export async function GetQuestionsByCompetitionId(id: string): Promise<{data: Question[] | null; error: string | null}> {
  try {
    const response = await axios.get(`${questionEndPoint}/GetByCompetitionId?CompetitionId=${id}`);
    if (response.status != 200) {
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.questions as Question[], error: null};
  } catch (e: Error | any) {
    return {data: null, error: ExtractErrorMessage(e)};
  }

}


export async function CreateQuestion(question: Question): Promise<{data: Question | null; error: string | null}> {
  const {competitionId, name, description, starterCode} = question;

  try {
    const response = await axios.post(`${questionEndPoint}/createQuestion`, {competitionId, name, description, starterCode});
    if (response.status != 200) {
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.question as Question, error: null};
  }
  catch (e: Error | any) {
    return {data: null, error: ExtractErrorMessage(e)};
  }
}

export async function UpdateQuestion(question: Question): Promise<{data: Question | null; error: string | null}> {
  const {id, name, description, starterCode} = question;

  try {
    const response = await axios.put(`${questionEndPoint}/updateQuestion`, {id, name, description, starterCode});
    if (response.status != 200) {
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.question as Question, error: null};
  }
  catch (e: Error | any) {
    return {data: null, error: ExtractErrorMessage(e)};
  }
}

export async function DeleteQuestion(questionId: string): Promise<{success: boolean; error: string | null}> {
  try {
    const response = await axios.delete(`${questionEndPoint}/deleteQuestion?Id=${questionId}`);
    if (response.status != 200) {
      return {success: false, error: ExtractErrorMessage(response)};
    }
    return {success: true, error: null};
  } catch (e: Error | any) {
    return {success: false, error: ExtractErrorMessage(e)};
  }
}
