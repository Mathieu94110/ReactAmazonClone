import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MessageBox from "@/components/MessageBox/MessageBox";
import { AuthContext } from "@/components/Providers/AuthProvider";
import { updateUserProfile } from "../../apis/users";
import styles from "./UserProfilePage.module.scss";
import { UserProfileType } from "@/types/types";

const UserProfilePage = () => {
  const [successUpdate, setSuccessUpdate] = useState<boolean>(false);
  const [errorUpdate, SetErrorUpdate] = useState<null | string>(null);
  const { user } = useContext(AuthContext);

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

  const submit = handleSubmit(
    async (userInfo: UserProfileType): Promise<void> => {
      try {
        clearErrors();
        if (userInfo.password !== userInfo.confirmPassword) {
          SetErrorUpdate("Le mot de passe ne correspond pas!");
        }
        const response = await updateUserProfile({
          userId: user._id,
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        });
        if (response.ok) {
          setSuccessUpdate(true);
          reset();
        }
      } catch (message) {
        setError("generic", { type: "generic", message });
      }
    }
  );
  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.userAccountCategories}>
        <div className={styles.userAccountCategory}>
          <div className={styles.userAccountCategoryInner}>
            <img
              src="https://m.media-amazon.com/images/G/08/x-locale/cs/help/images/gateway/self-service/YA_icon_address_01._CB657833298_.png"
              alt="notebook"
            />
            <div className="ml-10">
              <h2 className={styles.userAccountCategoryTtitle}>
                Informations utilisateur
              </h2>
              <div>
                <span>
                  Modifier les adresses et les préférences de livraison des
                  commandes et des cadeaux
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.userAccountCategory}>
          <div className={styles.userAccountCategoryInner}>
            <img
              src="https://m.media-amazon.com/images/G/08/x-locale/cs/ya/images/amazon_app._CB643878990_.png"
              alt="create ad"
            />
            <div className="ml-10">
              <h2 className={styles.userAccountCategoryTtitle}>
                Créer une annonce
              </h2>
              <div>
                <span>
                  Saisissez les informations demandées et mettez une annonce en
                  ligne,{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.userAccountCategory}>
          <div className={styles.userAccountCategoryInner}>
            <img
              src="https://m.media-amazon.com/images/G/08/x-locale/cs/help/images/gateway/self-service/order._CB659956101_.png"
              alt="ads"
            />
            <div className="ml-10">
              <h2 className={styles.userAccountCategoryTtitle}>Mes annonces</h2>
              <div>
                <span>Consulter ou modifier vos annonces en ligne</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.userAccountCategory}>
          <div className={styles.userAccountCategoryInner}>
            <img
              src="https://m.media-amazon.com/images/G/08/x-locale/cs/help/images/gateway/self-service/contact_us._CB659956101_.png"
              alt="contact"
            />
            <div className="ml-10">
              <h2 className={styles.userAccountCategoryTtitle}>
                Nous contacter
              </h2>
              <div>
                <span>
                  Contacter notre Service Client par téléphone, chat ou e-mail
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <form className={styles.userProfileForm} onSubmit={submit}>
        <h1>Votre compte</h1>
        <div className={styles.UserProfileMessage}>
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
          {successUpdate && (
            <MessageBox variant="success">
              Le profil a bien été mis à jour
            </MessageBox>
          )}
        </div>
        <div className={styles.profileFormIpSec}>
          <label htmlFor="name">Nom</label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="Changer le nom"
            {...register("name")}
          />
          <p className="form-error">
            {errors.name ? errors.name.message : null}
          </p>
        </div>

        <div className={styles.profileFormIpSec}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Changer le mail"
            {...register("email")}
          />
          <p className="form-error">
            {errors.email ? errors.email.message : null}
          </p>
        </div>

        <div className={styles.profileFormIpSec}>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Changer le mot de passe"
            {...register("password")}
          />
          <p className="form-error">
            {errors.password ? errors.password.message : null}
          </p>
        </div>

        <div className={styles.profileFormIpSec}>
          <label htmlFor="confirmpassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Changer le mot de passe"
            {...register("confirmPassword")}
          />
          <p className="form-error">
            {errors.confirmPassword ? errors.confirmPassword.message : null}
          </p>
        </div>

        <div>
          <button className={styles.updateBtn} disabled={isSubmitting}>
            Mettre à jour
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default UserProfilePage;
