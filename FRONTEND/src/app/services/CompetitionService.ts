import axios, { AxiosResponse } from "axios";
import { Competition } from "../models/Competition";
import { BACKEND_URL } from "../utils/config";

const competitionEndPoint = BACKEND_URL + "/competitions";

export async function getAllCompetitions(): Promise<{data: Competition[] | null, error : string | null}> {
  try {
    const response: AxiosResponse = await axios.get(`${competitionEndPoint}/getAll`);
    if(response.status != 200) {
        const errors = response.data.Errors;
        console.log(errors);
        return {data: null, error: errors[0].message};
      }
    return {data: response.data.competitions as Competition[], error: null}; 
    
  } catch (error : Error | any) {
    return {data: null, error: error.message};
  }
  
}
  
  export async function createCompetition(competition: Competition): Promise<{ success: boolean; error: string | null }> {
    const {title, description, startDate, endDate} = competition;
    try {
      const response: AxiosResponse<Competition> = await axios.post(`${competitionEndPoint}/createCompetition`, {title, description, startDate, endDate});
      
      if (response.status === 200) {
        return { success: true, error: null };
      } else {
        console.error('Failed to create competition. Status:', response.status);
        return { success: false, error: 'Failed to create competition' };
      }
    } catch (error) {
      console.error('Error creating competition:', error);
      return { success: false, error: 'Failed to create competition' };
    }
  }