import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuickInfo from "./components/QuickInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <div>Oppsies</div>, 
    children: [
      {
        path: "/",
        element: <QuickInfo/>
      }
    ]
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);