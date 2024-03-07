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
const Cart = lazy(() => import("./pages/CartPage/CartPage"));
const ShippingAddress = lazy(
  () => import("./pages/ShippingAdressPage/ShippingAdressPage")
);
const PaymentMethod = lazy(
  () => import("./pages/PaymentMethodPage/PaymentMethodPage")
);
const PlaceHolder = lazy(
  () => import("./pages/PlaceHolderPage/PlaceHolderPage")
);
const CreateAd = lazy(() => import("./pages/CreateAdPage/CreateAdPage"));
const UserAds = lazy(() => import("./pages/UserAdsPage/UserAdsPage"));
const UserInfo = lazy(() => import("./pages/UserInfoPage/UserInfoPage"));
const Contact = lazy(() => import("./pages/Contact/Contact"));

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
        path: "/create-ad",
        element: (
          <ProtectedRoute>
            <CreateAd />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-info",
        element: (
          <ProtectedRoute>
            <UserInfo />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-ads",
        element: (
          <ProtectedRoute>
            <UserAds />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact",
        element: (
          <ProtectedRoute>
            <Contact />
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
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "shipping",
        element: (
          <ProtectedRoute>
            <ShippingAddress />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <PaymentMethod />
          </ProtectedRoute>
        ),
      },
      {
        path: "placeholder",
        element: (
          <ProtectedRoute>
            <PlaceHolder />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
