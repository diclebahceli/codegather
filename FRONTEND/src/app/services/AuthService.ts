import axios from "axios";
import {RegisterUserDTO} from "../models/RegisterUserDTO";
import {BACKEND_URL} from "../utils/config";
import {LoginUserDTO} from "../models/LoginUserDTO";
import {jwtDecode} from "jwt-decode";
import {Claims} from "../models/Claims";
import {getWithExpiry, setWithExpiry} from "../utils/StorageGetter";

const authEndpointUrl = `${BACKEND_URL}/auth`;


export async function Register(info: RegisterUserDTO): Promise<{error: string | null}> {
  const {username, email, password} = info;
  try {
    const response = await axios.post(`${authEndpointUrl}/register`, {username, email, password})

    if (response.status != 200) {
      return {error: ExtractErrorMessage(response)}
    }
    return {error: null};
  }
  catch (error: Error | any) {
    return {error: ExtractErrorMessage(error)};
  }
}

export async function Login(info: LoginUserDTO): Promise<{error: string | null}> {
  const {email, password} = info;
  try {
    const response = await axios.post(`${authEndpointUrl}/login`, {email, password})

    if (response.status == 200) {
      const accessToken = response.data.accessToken;
      const decoded: Claims = jwtDecode(accessToken);

      setWithExpiry("accessToken", accessToken, new Date().getTime() + 45 * 24 * 60 * 60 * 1000);
      setWithExpiry("userId", decoded.id, new Date().getTime() + 45 * 24 * 60 * 60 * 1000);
      return {error: null};
    }
    else {
      return {error: ExtractErrorMessage(response)}
    }
  }
  catch (error: Error | any) {

    return {error: ExtractErrorMessage(error)};
  }
}

export async function Logout(email: string): Promise<{error: string | null}> {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  try {
    await axios.post(`${authEndpointUrl}/logout`, {email});
    return {error: null};

  } catch (error: Error | any) {
    return {error: error.message};
  }
}

export async function LogoutAll(): Promise<{error: string | null}> {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  try {
    await axios.post(`${authEndpointUrl}/logoutAll`);
    return {error: null};

  } catch (error: Error | any) {
    return {error: error.message};
  }
}

export async function GetAccessToken(): Promise<string> {
  const accessToken = getWithExpiry("accessToken");
  try {
    const response = await axios.post(`${authEndpointUrl}/refreshtoken`, {accessToken});

    if (response.status !== 200) {
      throw new Error('Failed to refresh token');
    }
    return response.data.accessToken;

  } catch (error: Error | any) {
    throw new Error('Failed to access server');
  }
}

export function SetInterceptors() {

  axios.interceptors.request.use(
    async (config) => {
      if (!isAccessTokenValid()) {
        // Refresh token logic (call your refresh token endpoint)
        const newAccessToken = await GetAccessToken();
        const decoded: Claims = jwtDecode(newAccessToken);
        setWithExpiry("accessToken", newAccessToken, new Date().getTime() + 45 * 24 * 60 * 60 * 1000);
        setWithExpiry("userId", decoded.id, new Date().getTime() + 45 * 24 * 60 * 60 * 1000);
      }
      const accessToken = getWithExpiry("accessToken");
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

}

function isAccessTokenValid(): boolean {
  const storedToken = getWithExpiry("accessToken");
  if (!storedToken) {
    return false; // No token stored
  }

  try {
    const decodedToken: Claims = jwtDecode(storedToken);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    return expirationTime > currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
}

export function ExtractErrorMessage(error: any): string {
  if (error.response) {
    if (error.response.data.errors) {
      return error.response.data.title;

    }
    else if (error.response.data.Errors) {
      return error.response.data.Errors[0];
    }
  }
  else if (error.data) {
    return error.data.Errors[0];
  }
  return error.message;
}

