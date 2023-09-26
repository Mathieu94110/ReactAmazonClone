import React from "react";
import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";

const components = {
  signin: Signin,
  signup: Signup,
};

function DynamicComponent({ component }) {
  const SelectComponent = components[component];
  return <SelectComponent />;
}

export default DynamicComponent;
