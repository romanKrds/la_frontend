import React from 'react';
import {Outlet} from "react-router-dom";
import {UserProvider} from "../context/userContext";


const Platform = () => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  )
}

export default Platform