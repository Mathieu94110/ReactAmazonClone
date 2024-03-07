import CreateAdForm from "./Components/CreateAdForm/CreateAdForm";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const CreateAdPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-100 flex-column justify-content-center align-items-center p-20">
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
