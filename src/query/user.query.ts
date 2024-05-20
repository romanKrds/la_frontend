import {patchedFetch} from './http-utils'
import {User} from "../interfaces/user.interface";


export const getCurrentUser = (): Promise<User> =>
  patchedFetch(`${process.env.REACT_APP_API_URL}/user/info`)
