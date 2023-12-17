import { useState } from "react";
import DynamicComponent from "@/utils/DynamicComponent";
import styles from "./LoginPage.module.scss";

const Login = () => {
  const [component, setComponent] = useState<"signin" | "signup">("signin");

  function switchComponent(): void {
    const switchedComponent = component === "signin" ? "signup" : "signin";
    setComponent(switchedComponent);
  }
  return (
    <div className={styles.loginPage}>
      <img
        src={require("@/assets/images/amazon-fr-logo.png")}
        alt="amazon.fr"
      />
      <DynamicComponent name={component} />
      <button onClick={() => switchComponent()} className="btn btn-secondary">
        {component === "signup"
          ? "Vous avez déja un compte"
          : "Vous n'avez pas encore de compte"}
      </button>
    </div>
  );
};

export default Login;
