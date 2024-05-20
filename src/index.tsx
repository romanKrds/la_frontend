import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css';

import App from './App';
import Memorize from "./components/memorize/memorize";
import Chat from "./components/chat/chat";
import Review from "./components/review/review";
import Login from "./components/auth/login";
import Platform from "./components/platform";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App/>,
    children: [
      {
        path: "login",
        element: <Login/>
      },
      {
        path: '',
        element: <Platform/>,
        children: [
          {
            path: "memorize/*",
            element: <Memorize/>,
          },
          {
            path: "chat/*",
            element: <Chat/>,
          },
          {
            path: "review/*",
            element: <Review/>,
          }
        ],
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
