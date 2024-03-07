import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="p-20">
      <div className="goBackButtonContainer">
        <button onClick={() => navigate(-1)} className="btn goBackButton">
          <KeyboardBackspaceIcon />
        </button>
        <div>Contact</div>
      </div>
    </div>
  );
};

export default Contact;
