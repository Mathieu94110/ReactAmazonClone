import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../Providers/AuthProvider";
import { Modal } from "../ForgotPasswordModal/ForgotPasswordModal";
import { SignInCredentials, UserSigninInput } from "@/types/types";
import { forgotPassword } from "../../apis/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const { signin, user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const defaultValues: UserSigninInput = {
    email: "",
    password: "",
    generic: null,
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("L'email n'est pas valide")
      .required("Il faut préciser votre email"),

    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
  });
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

  // useEffect on below clear form errors after delay
  useEffect(() => {
    if (errors)
      setTimeout(() => {
        clearErrors();
      }, 3000);
  }, [errors, clearErrors]);

  const submit = handleSubmit(
    async (credentials: SignInCredentials): Promise<void> => {
      try {
        clearErrors();
        await signin(credentials);
      } catch (message) {
        setError("generic", { type: "generic", message });
      }
    }
  );

  const handleButtonClick = async (content: null | string): Promise<void> => {
    setIsModalOpen(false);
    if (content) {
      try {
        const response = await forgotPassword(content);
        if (!response.ok) {
          toast.error(
            "Problème rencontré lors de la demande de réinitialisation!",
            {
              position: "top-right",
              autoClose: 200000,
            }
          );
        } else {
          toast.success(`Lien envoyé à l'adresse ${content}!`, {
            position: "top-right",
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <>
          <form onSubmit={submit} className="d-flex flex-column card p-20">
            <h2 className="mb-20 text-white">Connection</h2>
            <div className="mb-10 d-flex flex-column my-10">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                type="text"
                name="email"
                data-testid="signin-email-input"
                {...register("email")}
                placeholder="Indiquez votre email"
              />
              <p className="form-error">
                {errors.email ? errors.email.message : null}
              </p>
            </div>
            <div className="d-flex flex-column my-10">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                data-testid="signin-password-input"
                {...register("password")}
                placeholder="Renseignez votre mot de passe"
              />
              <p className="form-mixed-error">
                {errors.password
                  ? errors.password.message
                  : errors.generic
                  ? errors.generic.message
                  : null}
              </p>
            </div>
            <input
              type="button"
              disabled={isModalOpen}
              onClick={() => setIsModalOpen(true)}
              className="btn btn-secondary mt-2"
              value={"Mot de passe oublié ?"}
            />
            <button
              disabled={isSubmitting}
              className="btn btn-secondary my-2"
              type="submit"
            >
              Se connecter
            </button>
          </form>
          <>
            {isModalOpen &&
              createPortal(
                <Modal
                  closeModal={handleButtonClick}
                  onSubmit={handleButtonClick}
                  onCancel={handleButtonClick}
                />,
                document.body
              )}
          </>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default Signin;
