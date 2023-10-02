import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "./components/Providers/AuthProvider";
import CartProvider from "./components/Providers/CartProvider";

function App() {
  return (
    <div className="d-flex flex-column full-screen">
      <AuthProvider>
        <CartProvider>
          <div className="flex-fill">
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
export default App;
