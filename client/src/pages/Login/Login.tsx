import React, { useState } from "react";
import DynamicComponent from "../../utils/DynamicComponent";
import styles from "./Login.module.scss";
const Login = () => {
  const [component, setComponent] = useState("signup");

  function changeComponent() {
    const switchComponent = component === "signup" ? "signin" : "signup";
    setComponent(switchComponent);
  }
  return (
    <div
      className={`flex-fill d-flex flex-column align-items-center justify-content-center full-screen ${styles.loginBackground}`}
    >
      <DynamicComponent component={component} />
      <button
        onClick={() => changeComponent()}
        className="btn btn-secondary my-30"
      >
        {component === "signup"
          ? "Vous avez déja un compte"
          : "Vous n'avez pas encore de compte"}
      </button>
    </div>
  );
};

export default Login;
