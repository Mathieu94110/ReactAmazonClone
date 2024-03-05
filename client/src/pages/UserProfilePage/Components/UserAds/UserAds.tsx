import { useContext, useEffect } from "react";
import { AuthContext } from "@/components/Providers/AuthProvider";
import { getUserAds } from "@/apis/user-ads";

const UserAds = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetChUserAds() {
      await getUserAds(user._id);
    }
    fetChUserAds();
  }, [user]);

  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea modi saepe
        porro aspernatur ipsam ex totam debitis minus, voluptatem iusto
        inventore iste quibusdam quod ad quasi voluptas natus dolore velit!
      </p>
    </div>
  );
};

export default UserAds;
