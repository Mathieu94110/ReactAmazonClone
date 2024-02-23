import { useState, useEffect } from "react";
import { LockResetOutlined } from "@mui/icons-material";
import "./Modal.scss";

export const Modal = ({ onSubmit, onCancel, closeModal }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const timeOutId = () =>
    setTimeout(() => {
      setErrorMessage("");
    }, 1500);

  const modalContent = {
    title: "Mot de passe oublié",
    image: <LockResetOutlined />,
    text: "Renseignez votre adresse email et cliquez sur réinitialiser !",
    buttonText: "Réinitialiser",
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );
    if (email.trim().length === 0) {
      setErrorMessage("Il faut renseigner un mail");
      timeOutId();
    } else if (emailRegex.test(email)) {
      onSubmit(email);
    } else {
      setErrorMessage("L'email renseigné semble invalide");
      timeOutId();
    }
  };

  return (
    <section
      className="modal"
      onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const { target } = e;
        if (
          target instanceof HTMLElement &&
          target.classList.contains("modal-container")
        ) {
          closeModal("Modal was closed");
        }
      }}
    >
      <article className="modal-content center-content">
        <div onClick={() => closeModal("Modal was closed")}>
          <span className="reset-password-icon">{modalContent.image}</span>
        </div>
        <main>
          <h5 className="modal-title">{modalContent.title}</h5>
          <hr className="border-secondary" />
          <div className="pt-2 center-content">
            <p className="modal-text">{modalContent.text}</p>
          </div>
          {errorMessage ? (
            <p className="center-content text-error">{errorMessage}</p>
          ) : (
            ""
          )}
          <div className="p-20 center-content">
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="modal-btns" onClick={handleSubmit}>
            <button className="btn modal-btn send">
              {modalContent.buttonText}
            </button>
            <button
              type="submit"
              className="btn modal-btn cancel"
              onClick={() => onCancel()}
            >
              Annuler
            </button>
          </div>
        </main>
      </article>
    </section>
  );
};
