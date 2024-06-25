import axios from "axios";
import {BACKEND_URL} from "../utils/config";
import {ExtractErrorMessage} from "./AuthService";
import {Comment} from "../models/Comment";
import {CommentDto} from "../models/CommentDto";

const commentEndpoint = `${BACKEND_URL}/Comment`;


export async function CreateComment(comment: CommentDto): Promise<{error: string | null, success: boolean}> {
  const {content, questionId, userId} = comment;
  try {
    const response = await axios.post(`${commentEndpoint}/CreateComment`, {userId, questionId, content})

    if (response.status != 200) {
      return {error: ExtractErrorMessage(response), success: false}
    }
    return {error: null, success: true};
  }
  catch (error: Error | any) {
    return {error: ExtractErrorMessage(error), success: false};
  }
}

export async function DeleteComment(id: string): Promise<{error: string | null, success: boolean}> {
  try {
    const response = await axios.delete(`${commentEndpoint}/DeleteComment?Id=${id}`);

    if (response.status != 200) {
      return {error: ExtractErrorMessage(response), success: false};
    }
    return {error: null, success: true};
  } catch (error: Error | any) {
    return {error: ExtractErrorMessage(error), success: false};
  }
}

export async function UpdateComment(comment: Comment): Promise<{error: string | null, success: boolean}> {
  const {id, content} = comment;
  try {
    const response = await axios.put(`${commentEndpoint}/UpdateComment`, {id, content});

    if (response.status != 200) {
      return {error: ExtractErrorMessage(response), success: false};
    }
    return {error: null, success: true};
  } catch (error: Error | any) {
    return {error: ExtractErrorMessage(error), success: false};
  }
}

export async function GetCommentsByQuestionId(questionId: string): Promise<{data: Comment[] | null, error: string | null}> {
  try {
    const response = await axios.get(`${commentEndpoint}/GetAll?QuestionId=${questionId}`);
    if (response.status != 200) {
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.comments as Comment[], error: null};
  } catch (e: Error | any) {
    return {data: null, error: ExtractErrorMessage(e)};
  }
}

export async function GetCommentsByUserId(userId: string): Promise<{data: Comment[] | null, error: string | null}> {
  try {
    const response = await axios.get(`${commentEndpoint}/GetAll?UserId=${userId}`);
    if (response.status != 200) {
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.comments as Comment[], error: null};
  } catch (e: Error | any) {
    return {data: null, error: ExtractErrorMessage(e)};
  }
}

export async function GetCommentById(id: string): Promise<{data: Comment | null, error: string | null}> {
  try {
    const response = await axios.get(`${commentEndpoint}/GetById?Id=${id}`);
    if (response.status != 200) {
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.comment as Comment, error: null};
  } catch (e: Error | any) {
    return {data: null, error: ExtractErrorMessage(e)};
  }
}
