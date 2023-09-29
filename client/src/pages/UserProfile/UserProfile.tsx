import React, { useContext, useState } from "react";
import styles from "./UserProfile.module.scss";
import { AuthContext } from "../../components/context/AuthContext";
import { updateUserProfile } from "../../apis/users";
import MessageBox from "../../components/MessageBox/MessageBox";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [errorUpdate, SetErrorUpdate] = useState(null);
  const { user } = useContext(AuthContext);

  const updateDetails = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      alert("Le mot de passe ne correspond pas!");
    } else {
      try {
        const response = await updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
        });
        if (response.ok) {
          setSuccessUpdate(true);
        }
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        SetErrorUpdate(message);
      }
    }
  };
  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={updateDetails}>
          <h1>Profil Utilisateur</h1>
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
          <div className={styles.formIpSec}>
            <label htmlFor="name">Nom:</label>
            <input
              type="name"
              id="name"
              placeholder="Changer le nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className={styles.formIpSec}>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              placeholder="Changer le mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className={styles.formIpSec}>
            <label htmlFor="password">Mot de passe:</label>
            <input
              type="password"
              id="password"
              placeholder="Changer le mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className={styles.formIpSec}>
            <label htmlFor="confirmpassword">Confirmer le mot de passe:</label>
            <input
              type="password"
              id="confirmpassword"
              placeholder="Changer le mot de passe"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>

          <div>
            <button className={styles.updateBtn} type="submit">
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
