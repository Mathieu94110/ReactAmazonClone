import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/components/Providers/AuthProvider";
import { getUserAds } from "@/apis/user-ads";
import UserAdsList from "./Components/UserAdsList/UserAdsList";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const UserAdsPage = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userAds, setUserAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetChUserAds() {
      setIsLoading(true);
      const userAds = await getUserAds(user._id);
      setUserAds(userAds);
      setIsLoading(false);
    }
    fetChUserAds();
  }, [user]);

  return (
    <div className="p-20">
      <div className="goBackButtonContainer">
        <button onClick={() => navigate(-1)} className="btn goBackButton">
          <KeyboardBackspaceIcon />
        </button>
      </div>
      {isLoading ? (
        <h2>Chargement en cours</h2>
      ) : userAds.length > 0 ? (
        <UserAdsList ads={userAds} />
      ) : (
        <h2>Aucunes annonce pour le moment</h2>
      )}
    </div>
  );
};

export default UserAdsPage;
