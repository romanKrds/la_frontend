import {patchedFetch} from './http-utils'
import {UserCreds} from "../interfaces/userCreds.interface";

interface LoginResponse {
  token: string;
}

export const login = (data: UserCreds): Promise<LoginResponse> =>
  patchedFetch(`${process.env.REACT_APP_API_URL}/auth/login`, {method: 'POST', body: JSON.stringify(data)})
