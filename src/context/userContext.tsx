import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {User} from "../interfaces/user.interface";
import {getAuthToken} from "../utils";
import {getCurrentUser} from "../query/user.query";
import {useError} from "./errorContext";

interface UserContextAPI {
  user: User | undefined;
}

const UserContext = createContext<UserContextAPI>({user: undefined});

export const UserProvider = ({children}: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User>();
  const {showError} = useError();

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      showError('Authentication required');

      location.href = '/login';
    }

    getCurrentUser()
      .then(user => setUserData(user))
      .catch(({error}) => showError(error));
  }, []);


  return (
    <UserContext.Provider value={{user: userData}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext<UserContextAPI>(UserContext)