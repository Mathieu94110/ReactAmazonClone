import { useContext } from "react";
import UserInfoForm from "./Components/UserInfoForm/UserInfoForm";
import { AuthContext } from "@/components/Providers/AuthProvider";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "./UserInfoPage.module.scss";
import { useNavigate } from "react-router-dom";
const UserInfoPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className={styles.userInfoPage}>
      <div className="goBackButtonContainer">
        <button onClick={() => navigate(-1)} className="btn goBackButton">
          <KeyboardBackspaceIcon />
        </button>
      </div>
      <div className={styles.currentInfoContainer}>
        <h2>Vos informations</h2>
        <ul className={styles.currentInfoDetails}>
          <li>
            <span>Nom</span> <span>{user.name}</span>
          </li>
          <li>
            <span>Email</span> <span>{user.email}</span>
          </li>
        </ul>
      </div>
      <UserInfoForm user={user} />
    </div>
  );
};

export default UserInfoPage;
