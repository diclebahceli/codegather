import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "../utils/config";
import { UserDto } from "../models/UserDto";


const userEndPoint = BACKEND_URL + "/user";


export async function getAllUsers(): Promise<{data:UserDto[] | null; error: string|null}>{
    try{
        const response = await axios.get(`${userEndPoint}/getAll`);
        if(response.status != 200) {
            const errors = response.data.Errors;
            console.log(errors);
            return {data: null, error: errors[0].message};
          }
        return {data: response.data.users as UserDto[], error: null};

    } catch (error : Error | any) {
        return {data: null, error: error.message};
    }
}


export async function getUserById(userId: string): Promise<{data: UserDto | null; error: string | null}>{
    try{
        const response = await axios.get(`${userEndPoint}/getById`);
        if(response.status != 200){
            //TODO

        }
        //return {data: response.data.user}

    }catch(error){
            //TODO
    }
}
