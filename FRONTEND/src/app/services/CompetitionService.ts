import axios, {AxiosResponse} from "axios";
import {Competition} from "../models/Competition";
import {BACKEND_URL} from "../utils/config";
import {ExtractErrorMessage} from "./AuthService";

const competitionEndPoint = BACKEND_URL + "/competition";

export async function GetAllCompetitions(): Promise<{data: Competition[] | null, error: string | null}> {
  try {
    const response = await axios.get(`${competitionEndPoint}/getAll`);
    if (response.status != 200) {
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.competitions as Competition[], error: null};

  } catch (error: Error | any) {
    return {data: null, error: ExtractErrorMessage(error)};
  }

}

export async function GetCompetitionById(competitionId: string):
  Promise<{data: Competition | null, error: string | null}> {
  try {
    const response = await axios.get(`${competitionEndPoint}/GetById?Id=${competitionId}`);

    if (response.status != 200) {
      const errors = response.data.Errors;
      console.log(errors);
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.competition as Competition, error: null};
  }
  catch (error: Error | any) {
    return {data: null, error: ExtractErrorMessage(error)};
  }
}
export async function CreateCompetition(competition: Competition): Promise<{success: boolean; error: string | null}> {
  const {title, description, startDate, endDate} = competition;
  try {
    const response: AxiosResponse<Competition> = await axios.post(`${competitionEndPoint}/createCompetition`, {title, description, startDate, endDate});

    if (response.status === 200) {
      return {success: true, error: null};
    } else {
      return {success: false, error: ExtractErrorMessage(response)};
    }

  } catch (error) {
    return {success: false, error: ExtractErrorMessage(error)};
  }
}


export async function UpdateCompetition(competition: Competition): Promise<{success: boolean; error: string | null}> {
  const {id, title, description, startDate, endDate} = competition;

  try {
    const response: AxiosResponse<Competition> = await axios.put(`${competitionEndPoint}/updateCompetition`, {id, title, description, startDate, endDate});

    if (response.status === 200) {
      return {success: true, error: null};
    } else {
      return {success: false, error: ExtractErrorMessage(response)}
    }

  } catch (error) {
    return {success: false, error: ExtractErrorMessage(error)};
  }
}


export async function DeleteCompetition(competitionId: string): Promise<{success: boolean; error: string | null}> {

  try {

    const response: AxiosResponse = await axios.delete(`${competitionEndPoint}/deleteCompetition?Id=${competitionId}`);

    if (response.status === 200) {
      return {success: true, error: null};
    } else {
      return {success: false, error: ExtractErrorMessage(response)}
    }
  } catch (error) {
    return {success: false, error: ExtractErrorMessage(error)};
  }
}
