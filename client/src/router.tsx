import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./loaders/rootLoader";
import App from "./App";
import ProtectedRoute from "./utils/ProtectedRoute/ProtectedRoute";
import UserProfile from "./pages/UserProfilePage/UserProfilePage";
import CategoryBased from "./pages/CategoryBasedPage/CategoryBasedPage";
const Login = lazy(() => import("./pages/LoginPage/LoginPage"));
const Home = lazy(() => import("./pages/HomePage/HomePage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,
    children: [
      {
        index: true,
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
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/category/:cat",
        element: (
          <ProtectedRoute>
            <CategoryBased />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
