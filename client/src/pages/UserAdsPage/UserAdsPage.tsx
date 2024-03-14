import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { UserAdType } from "@/types/types";
import { getUserAds, deleteAd } from "@/apis/user-ads";
import { AuthContext } from "@/components/Providers/AuthProvider";
import UserAdsList from "./Components/UserAdsList/UserAdsList";
import UserAdModal from "@/components/UserAdModal/UserAdModal";

const UserAdsPage = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userAds, setUserAds] = useState<UserAdType[]>([]);
  const [selectedAd, setSelectedAd] = useState<UserAdType | null>(null);
  const navigate = useNavigate();

  async function fetChUserAds(): Promise<void> {
    setIsLoading(true);
    try {
      const userAds = await getUserAds(user._id);
      setUserAds(userAds);
    } catch (e) {
      const message = e.errors
        ? e.errors[0]
        : e.message
        ? e.message
        : "Problème serveur";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetChUserAds();
  }, [user]);

  const handleDeleteAd = async (id: string): Promise<void> => {
    const response = await deleteAd(id);
    if (response && response.status === 200) {
      setUserAds(userAds.filter((ad) => ad._id !== id));
    }
  };

  const handleDisplayAdDetails = (id: string): void => {
    const selectedAd = userAds.find((ad) => ad._id === id);
    setIsModalOpen(true);
    setSelectedAd(selectedAd);
  };

  const handleClose = (): void => {
    setIsModalOpen(false);
  };

  const adUpdated = (): void => {
    handleClose();
    fetChUserAds();
  };

  return (
    <div className="p-20 relative">
      <div className="goBackButtonContainer">
        <button onClick={() => navigate(-1)} className="btn goBackButton">
          <KeyboardBackspaceIcon />
        </button>
      </div>
      {isLoading ? (
        <h2>Chargement en cours</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : userAds.length > 0 ? (
        <UserAdsList
          ads={userAds}
          deleteAd={handleDeleteAd}
          seeAdDetails={handleDisplayAdDetails}
        />
      ) : (
        <h2 className="flex-column justify-content-center align-items-center">
          Aucunes annonce pour le moment
        </h2>
      )}
      {isModalOpen &&
        createPortal(
          <UserAdModal
            isOpen={isModalOpen}
            handleClose={handleClose}
            adUpdated={adUpdated}
            ad={selectedAd}
          />,
          document.body
        )}
    </div>
  );
};

export default UserAdsPage;
