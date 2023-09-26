import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="d-flex flex-column full-screen">
      <div className="flex-fill">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
export default App;
