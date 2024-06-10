import axios from "axios";
import {BACKEND_URL} from "../utils/config";
import {User} from "../models/User";
import {ExtractErrorMessage} from "./AuthService";


const userEndPoint = BACKEND_URL + "/user";


export async function GetAllUsers(): Promise<{data: User[] | null; error: string | null}> {
  try {
    const response = await axios.get(`${userEndPoint}/getAll`);
    if (response.status != 200) {
      const errors = response.data.Errors;
      console.log(errors);
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.users as User[], error: null};

  } catch (error: Error | any) {
    return {data: null, error: ExtractErrorMessage(error)};
  }
}


export async function GetUserById(userId: string): Promise<{data: User | null; error: string | null}> {
  try {

    const response = await axios.get(`${userEndPoint}/getById?Id=${userId}`);
    if (response.status != 200) {
      //TODO
      const error = response.data.Errors;
      return {data: null, error: ExtractErrorMessage(response)};
    }
    const usr = response.data.user as User;
    usr.competitions = response.data.competitions;
    usr.submissions = response.data.submissions;

    return {data: usr, error: null};

  } catch (error: Error | any) {
    //TODO
    return {data: null, error: ExtractErrorMessage(error)};
  }


}

export async function GetUserByUsername(username: string): Promise<{data: User | null; error: string | null}> {

  try {
    const response = await axios.get(`${userEndPoint}/getByUsername?UserName=${username}`);
    if (response.status != 200) {
      const error = response.data.Errors;
      return {data: null, error: ExtractErrorMessage(response)};
    }

    const usr = response.data.user as User;
    usr.competitions = response.data.competitions;
    usr.submissions = response.data.submissions;
    return {data: usr, error: null};
  } catch (error: Error | any) {
    return {data: null, error: ExtractErrorMessage(error)};
  }
}



export async function UpdateUser(userDto: User): Promise<{success: boolean; error: string | null}> {
  const {id, userName, email, profileImage} = userDto;
  try {
    const response = await axios.put(`${userEndPoint}/updateUser/`, {id, userName, email, profileImage});
    if (response.status != 200) {
      const error = response.data.Errors;
      return {success: false, error: ExtractErrorMessage(response)};
    }
    return {success: true, error: null};
  } catch (error: Error | any) {
    return {success: false, error: ExtractErrorMessage(error)};
  }
}


export async function DeleteUser(userId: string): Promise<{success: boolean; error: string | null}> {
  try {
    const response = await axios.delete(`${userEndPoint}/deleteUser?Id=${userId}`);
    if (response.status != 200) {
      const error = response.data.Errors;
      return {success: false, error: ExtractErrorMessage(response)};
    }
    return {success: true, error: null};
  } catch (error: Error | any) {
    return {success: false, error: ExtractErrorMessage(error)};
  }
}


export async function GetUserRoles(id: string): Promise<{data: string[] | null; error: string | null}> {
  try {
    const response = await axios.get(`${userEndPoint}/getUserRole?UserId=${id}`);
    if (response.status != 200) {
      const error = response.data.Errors;
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.roles as string[], error: null};
  } catch (error: Error | any) {
    return {data: null, error: ExtractErrorMessage(error)};
  }
}


export async function SetUserRole(userId: string, roles: string[]): Promise<{success: boolean; error: string | null}> {
  console.log(userId, roles);
  try {
    const response = await axios.put(`${userEndPoint}/setUserRole`, {userId, roles});
    if (response.status != 200) {
      const error = response.data.Errors;
      return {success: false, error: ExtractErrorMessage(response)};
    }
    return {success: true, error: null};
  } catch (error: Error | any) {
    return {success: false, error: ExtractErrorMessage(error)};
  }
}


export async function GetAllRoles(): Promise<{data: string[] | null; error: string | null}> {
  try {
    const response = await axios.get(`${userEndPoint}/getAllRoles`);
    if (response.status != 200) {
      return {data: null, error: ExtractErrorMessage(response)};
    }
    return {data: response.data.roles as string[], error: null};
  } catch (error: Error | any) {
    return {data: null, error: ExtractErrorMessage(error)};
  }
}


export async function JoinCompetition(userId: string, competitionId: string): Promise<{success: boolean; error: string | null}> {
  try {
    const response = await axios.put(`${userEndPoint}/joinCompetition`, {userId, competitionId});
    if (response.status != 200) {
      return {success: false, error: ExtractErrorMessage(response)};
    }
    return {success: true, error: null};
  } catch (error: Error | any) {
    return {success: false, error: ExtractErrorMessage(error)};
  }
}


export async function GetUserByUserName(userName: string): Promise<{data: User | null; error: string | null}> {
  try {
    const response = await axios.get(`${userEndPoint}/getByUserName?userName=${userName}`);
    if (response.status != 200) {
      const error = response.data.Errors;
      return {data: null, error: error[0].message};
    }
    const user = response.data.user as User;
    user.competitions = response.data.competitions;
    return {data: response.data.user as User, error: null};
  } catch (error: Error | any) {
    return {data: null, error: error.message};
  }
}
