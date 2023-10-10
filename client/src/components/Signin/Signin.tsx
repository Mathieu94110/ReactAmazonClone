import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { UserSigninInput } from "@/types/types";

function Signin() {
  const { signin, user } = useContext(AuthContext);

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("L'email n'est pas valide"),
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
  });

  const defaultValues: UserSigninInput = {
    email: "",
    password: "",
    generic: null,
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<UserSigninInput>({
    defaultValues,
    resolver: yupResolver(validationSchema) as any,
  });

  const submit = handleSubmit(async (credentials) => {
    try {
      clearErrors();
      await signin(credentials);
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });
  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <form onSubmit={submit} className="d-flex flex-column card p-20">
          <h2 className="mb-20 text-white">Connexion</h2>
          <div className="mb-10 d-flex flex-column my-10">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input type="text" name="email" {...register("email")} />
            <p className="form-error">
              {errors.email ? errors.email.message : null}
            </p>
          </div>
          <div className="mb-10 d-flex flex-column my-10">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <input type="password" name="password" {...register("password")} />
            <p className="form-error">
              {errors.password ? errors.password.message : null}
            </p>
          </div>
          <div className="mb-10">
            <p className="form-error">
              {errors.generic ? errors.generic.message : null}
            </p>
          </div>
          <div className="mt-10">
            <button disabled={isSubmitting} className="btn btn-secondary my-1">
              Connexion
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default Signin;
