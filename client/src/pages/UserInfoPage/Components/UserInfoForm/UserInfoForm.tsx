import MessageBox from "@/components/MessageBox/MessageBox";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserProfile } from "../../../../apis/users";
import styles from "./UserInfoForm.module.scss";
import { UserProfileType, UserType } from "@/types/types";

function UserInfoForm({
  user,
  updateUserInfo,
}: {
  user: UserType;
  updateUserInfo: () => void;
}) {
  const [successUpdate, setSuccessUpdate] = useState<boolean>(false);
  const [errorUpdate, SetErrorUpdate] = useState<null | string>(null);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Le nom est requis")
      .max(10, "Le nom est trop long"),
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("L'email n'est pas valide"),
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
    confirmPassword: yup
      .string()
      .required("Il faut repréciser le mot de passe")
      .min(6, "Mot de passe trop court"),
  });

  const defaultValues: UserProfileType = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    generic: null,
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema) as any,
  });

  // useEffect on below clear form errors after delay
  useEffect(() => {
    if (errors)
      setTimeout(() => {
        clearErrors();
      }, 3000);
    if (errorUpdate) {
      setTimeout(() => {
        SetErrorUpdate(null);
      }, 3000);
    }
    if (successUpdate) {
      setTimeout(() => {
        setSuccessUpdate(null);
      }, 3000);
    }
  }, [errors, errorUpdate, successUpdate, clearErrors]);

  const submit = handleSubmit(
    async (userInfo: UserProfileType): Promise<void> => {
      try {
        clearErrors();
        if (userInfo.password !== userInfo.confirmPassword) {
          SetErrorUpdate("Le mot de passe ne correspond pas!");
        } else {
          const response = await updateUserProfile({
            userId: user._id,
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
          });
          if (response.ok) {
            setSuccessUpdate(true);
            updateUserInfo();
            reset();
          }
        }
      } catch (message) {
        setError("generic", { type: "generic", message });
      }
    }
  );

  return (
    <form className={styles.userProfileForm} onSubmit={submit}>
      <h1>Modifier vos informations</h1>
      <div className={styles.UserProfileMessage}>
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {successUpdate && (
          <MessageBox variant="success">
            Le profil a bien été mis à jour
          </MessageBox>
        )}
      </div>
      <div className={styles.profileFormIpSec}>
        <label className="mb-5 secondary" htmlFor="name">
          Nom
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Changer le nom"
          {...register("name")}
          className={styles.userInfoFormInput}
        />
        <p className="form-error">{errors.name ? errors.name.message : null}</p>
      </div>

      <div className={styles.profileFormIpSec}>
        <label className="mb-5 secondary" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Changer le mail"
          {...register("email")}
          className={styles.userInfoFormInput}
        />
        <p className="form-error">
          {errors.email ? errors.email.message : null}
        </p>
      </div>

      <div className={styles.profileFormIpSec}>
        <label className="mb-5 secondary" htmlFor="password">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Changer le mot de passe"
          {...register("password")}
          className={styles.userInfoFormInput}
        />
        <p className="form-error">
          {errors.password ? errors.password.message : null}
        </p>
      </div>

      <div className={styles.profileFormIpSec}>
        <label className="mb-5 secondary" htmlFor="confirmpassword">
          Confirmer le mot de passe
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          {...register("confirmPassword")}
          className={styles.userInfoFormInput}
        />
        <p className="form-error">
          {errors.confirmPassword ? errors.confirmPassword.message : null}
        </p>
      </div>

      <button className="btn btn-secondary h-6" disabled={isSubmitting}>
        Mettre à jour
      </button>
    </form>
  );
}

export default UserInfoForm;
