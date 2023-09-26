import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "./components/AuthProvider/AuthProvider";

function App() {
  return (
    <div className="d-flex flex-column full-screen">
      <AuthProvider>
        <div className="flex-fill">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </AuthProvider>
    </div>
  );
}
export default App;
