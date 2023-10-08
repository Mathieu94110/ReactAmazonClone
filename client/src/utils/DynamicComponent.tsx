import React from "react";
import Signin from "../components/Signin/Signin";
import Signup from "../components/Signup/Signup";

const components = {
  signin: Signin,
  signup: Signup,
};

function DynamicComponent({ name }: { name: string }) {
  const SelectComponent = components[name];
  return <SelectComponent />;
}

export default DynamicComponent;
