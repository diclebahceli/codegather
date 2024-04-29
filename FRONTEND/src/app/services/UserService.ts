import axios, {AxiosResponse} from "axios";
import {BACKEND_URL} from "../utils/config";
import {UserDto} from "../models/UserDto";


const userEndPoint = BACKEND_URL + "/user";


export async function getAllUsers(): Promise<{data: UserDto[] | null; error: string | null}> {
  try {
    const response = await axios.get(`${userEndPoint}/getAll`);
    if (response.status != 200) {
      const errors = response.data.Errors;
      console.log(errors);
      return {data: null, error: errors[0].message};
    }
    return {data: response.data.users as UserDto[], error: null};

  } catch (error: Error | any) {
    return {data: null, error: error.message};
  }
}


export async function getUserById(userId: string): Promise<{data: UserDto | null; error: string | null}> {
  try {

    const response = await axios.get(`${userEndPoint}/getById?Id=${userId}`);
    if (response.status != 200) {
      //TODO
      const error = response.data.Errors;
      return {data: null, error: error[0].message};
    }

    return {data: response.data.user as UserDto, error: null};
  } catch (error: Error | any) {
    //TODO
    return {data: null, error: error.message};
  }


}


export async function updateUser(userDto: UserDto): Promise<{success: boolean; error: string | null}> {
  const {id, userName, email} = userDto;

  try {
    const response = await axios.put(`${userEndPoint}/updateUser/`, {id, userName, email});
    if (response.status != 200) {
      const error = response.data.Errors;
      return {success: false, error: error[0].message};
    }
    return {success: true, error: null};
  } catch (error: Error | any) {
    return {success: false, error: error.message};
  }
}


export async function deleteUser(userId: string): Promise<{success: boolean; error: string | null}> {
  try {
    const response = await axios.delete(`${userEndPoint}/deleteUser?Id=${userId}`);
    if (response.status != 200) {
      const error = response.data.Errors;
      return {success: false, error: error[0].message};
    }
    return {success: true, error: null};
  } catch (error: Error | any) {
    return {success: false, error: error.message};
  }
}
