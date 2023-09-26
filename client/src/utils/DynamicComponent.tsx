import React from "react";
import Signin from "../components/Signin/Signin";
import Signup from "../components/Signup/Signup";

const components = {
  signin: Signin,
  signup: Signup,
};

function DynamicComponent({ component }) {
  const SelectComponent = components[component];
  return <SelectComponent />;
}

export default DynamicComponent;
