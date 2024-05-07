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
    const user = response.data.user as UserDto;
    user.competitions = response.data.competitions;
    return {data: user, error: null};
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


export async function GetUserRoles(id: string): Promise<{data: string[] | null; error: string | null}> {
  try {
    const response = await axios.get(`${userEndPoint}/getUserRole?UserId=${id}`);
    if (response.status != 200) {
      const error = response.data.Errors;
      return {data: null, error: error[0].message};
    }
    return {data: response.data.roles as string[], error: null};
  } catch (error: Error | any) {
    return {data: null, error: error.message};
  }
}


export async function SetUserRole(userId: string, roles: string[]): Promise<{success: boolean; error: string | null}> {
  console.log(userId, roles);
  try {
    const response = await axios.put(`${userEndPoint}/setUserRole`, {userId, roles});
    if (response.status != 200) {
      const error = response.data.Errors;
      return {success: false, error: error[0].message};
    }
    return {success: true, error: null};
  } catch (error: Error | any) {
    return {success: false, error: error.message};
  }
}


export async function GetAllRoles(): Promise<{data: string[] | null; error: string | null}> {
  try {
    const response = await axios.get(`${userEndPoint}/getAllRoles`);
    if (response.status != 200) {
      const error = response.data.Errors;
      return {data: null, error: error[0].message};
    }
    return {data: response.data.roles as string[], error: null};
  } catch (error: Error | any) {
    return {data: null, error: error.message};
  }
}


export async function JoinCompetition(userId: string, competitionId: string): Promise<{success: boolean; error: string | null}> {
  try {
    const response = await axios.put(`${userEndPoint}/joinCompetition`, {userId, competitionId});
    if (response.status != 200) {
      const error = response.data.Errors;
      return {success: false, error: error[0].message};
    }
    return {success: true, error: null};
  } catch (error: Error | any) {
    return {success: false, error: error.message};
  }
}


export async function GetUserByUserName(userName: string): Promise<{data: UserDto | null; error: string | null}> {
  try {
    const response = await axios.get(`${userEndPoint}/getByUserName?userName=${userName}`);
    if (response.status != 200) {
      const error = response.data.Errors;
      return {data: null, error: error[0].message};
    }
    const user = response.data.user as UserDto;
    user.competitions = response.data.competitions;
    return {data: response.data.user as UserDto, error: null};
  } catch (error: Error | any) {
    return {data: null, error: error.message};
  }
}
