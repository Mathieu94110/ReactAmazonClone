import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./loaders/rootLoader";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/HomePage/HomePage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,
    children: [
      {
        index: true,
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
