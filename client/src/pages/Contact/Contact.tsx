import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import styles from "./Contact.module.scss";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.contactPage}>
      <div className="goBackButtonContainer">
        <button onClick={() => navigate(-1)} className="btn goBackButton">
          <KeyboardBackspaceIcon />
        </button>
      </div>
      <h2>Page contact en cours de développement</h2>
    </div>
  );
};

export default Contact;
