import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// const Homepage = lazy(() => import("./pages/HomePage/HomePage"));
const Login = lazy(() => import("./pages/Login/Login"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
]);
