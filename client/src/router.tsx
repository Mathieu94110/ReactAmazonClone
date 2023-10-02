import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./loaders/rootLoader";
import App from "./App";
import ProtectedRoute from "./utils/ProtectedRoute/ProtectedRoute";

const UserProfile = lazy(
  () => import("./pages/UserProfilePage/UserProfilePage")
);
const CategoryBased = lazy(
  () => import("./pages/CategoryBasedPage/CategoryBasedPage")
);
const Product = lazy(() => import("./pages/ProductPage/ProductPage"));
const Login = lazy(() => import("./pages/LoginPage/LoginPage"));
const Home = lazy(() => import("./pages/HomePage/HomePage"));
const Cart = lazy(() => import("./pages/Cart/Cart"));

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
        path: "/products/product/:id",
        element: (
          <ProtectedRoute>
            <Product />
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
      {
        path: "/cart/:id?",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
