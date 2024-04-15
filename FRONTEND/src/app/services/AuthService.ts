import axios from "axios";
import {RegisterUserDTO} from "../models/RegisterUserDTO";
import {BACKEND_URL} from "../utils/config";
import {LoginUserDTO} from "../models/LoginUserDTO";
import {jwtDecode} from "jwt-decode";
import {Claims} from "../models/Claims";

const authEndpointUrl = `${BACKEND_URL}/auth`;


export async function Register(info: RegisterUserDTO): Promise<{error: string | null}> {
  const {username, email, password} = info;
  try {
    const response = await axios.post(`${authEndpointUrl}/register`, {username, email, password})

    if (response.status != 200) {
      const errors = response.data.Errors
      console.log(errors)
      return {error: errors}
    }
    return {error: null};
  }
  catch (error: Error | any) {
    return {error: error.message};
  }
}

export async function Login(info: LoginUserDTO): Promise<{error: string | null}> {
  const {email, password} = info;
  try {
    const response = await axios.post(`${authEndpointUrl}/login`, {email, password})

    if (response.status == 200) {
      const accessToken = response.data.accessToken;
      const decoded: Claims = jwtDecode(accessToken);

      console.log(decoded);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", decoded.id);
      return {error: null};
    }
    else {

      const errors = response.data.Errors
      return {error: errors[0].message}
    }
  }
  catch (error: Error | any) {
    let errorMessage = error.message;
    if (error.response.data.Errors[0]) {
      errorMessage = error.response.data.Errors[0];
    }
    return {error: errorMessage};
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
  const accessToken = localStorage.getItem('accessToken');
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
        localStorage.setItem('accessToken', newAccessToken);
      }
      const accessToken = localStorage.getItem('accessToken');
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

}

function isAccessTokenValid(): boolean {
  const storedToken = localStorage.getItem('accessToken');
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
    return false; // Handle decoding errors conservatively
  }
}
