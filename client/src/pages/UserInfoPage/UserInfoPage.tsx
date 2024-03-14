import { useContext, useState } from "react";
import UserInfoForm from "./Components/UserInfoForm/UserInfoForm";
import { AuthContext } from "@/components/Providers/AuthProvider";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "./UserInfoPage.module.scss";
import { useNavigate } from "react-router-dom";
import { UserType } from "@/types/types";
import { getCurrentUser } from "@/apis/auth";

const UserInfoPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserType>(user);

  const updateUserInfo = async () => {
    const updatedUserInfo = await getCurrentUser();
    setUserInfo(updatedUserInfo);
  };

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
            <span>Nom</span> <span>{userInfo.name}</span>
          </li>
          <li>
            <span>Email</span> <span>{userInfo.email}</span>
          </li>
        </ul>
      </div>
      <UserInfoForm user={userInfo} updateUserInfo={updateUserInfo} />
    </div>
  );
};

export default UserInfoPage;
