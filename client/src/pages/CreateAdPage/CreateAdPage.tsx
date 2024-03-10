import CreateAdForm from "./Components/CreateAdForm/CreateAdForm";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "./CreateAdPage.module.scss";

const CreateAdPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.createAdPage}>
      <div className="goBackButtonContainer">
        <button onClick={() => navigate(-1)} className="btn goBackButton">
          <KeyboardBackspaceIcon />
        </button>
      </div>

      <CreateAdForm />
    </div>
  );
};

export default CreateAdPage;
