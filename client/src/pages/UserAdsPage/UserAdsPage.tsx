import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/components/Providers/AuthProvider";
import { getUserAds, deleteAd } from "@/apis/user-ads";
import UserAdsList from "./Components/UserAdsList/UserAdsList";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { UserAdType } from "@/types/types";

const UserAdsPage = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userAds, setUserAds] = useState<UserAdType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetChUserAds(): Promise<void> {
      setIsLoading(true);
      const userAds = await getUserAds(user._id);
      setUserAds(userAds);
      setIsLoading(false);
    }
    fetChUserAds();
  }, [user]);

  const handleDeleteAd = async (id: string): Promise<void> => {
    const response = await deleteAd(id);
    if (response && response.status === 200) {
      setUserAds(userAds.filter((ad) => ad._id !== id));
    }
  };

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
        <UserAdsList ads={userAds} deleteAd={handleDeleteAd} />
      ) : (
        <h2 className="flex-column justify-content-center align-items-center">
          Aucunes annonce pour le moment
        </h2>
      )}
    </div>
  );
};

export default UserAdsPage;
