import styles from "./UserAdsList.module.scss";
import UserAd from "../UserAd/UserAd";
import { UserAdCategoryType, UserAdType } from "@/types/types";

const UserAdsList = ({
  ads,
  deleteAd,
  seeAdDetails,
}: {
  ads: UserAdType[];
  deleteAd: (v: string) => void;
  seeAdDetails: (v: string) => void;
}) => {
  const adsCategories = [];
  const adDictionnary = {
    televisions: "Télévisions",
    headphones: "Écouteurs",
    "computer accessories": "Accessoires d'ordinateurs",
    laptop: "Ordinateurs portable",
    others: "Autres",
  };
  // We creating categories depending on categories values on ads
  ads.map((ad: UserAdType) => {
    adsCategories.indexOf(ad.category) < 0 && adsCategories.push(ad.category);
  });

  return (
    <div className="flex-fill">
      {adsCategories.map((cat: UserAdCategoryType, index: number) => {
        return (
          <div key={index}>
            <hr
              className={styles.categorySeparator}
              data-content={adDictionnary[cat]}
            ></hr>
            <div className={`d-flex wrap gap-10 ${styles.userAdContainer}`}>
              {ads.map((ad: UserAdType, index: number) => {
                return (
                  ad.category === cat && (
                    <UserAd
                      ad={ad}
                      deleteAd={deleteAd}
                      seeAdDetails={seeAdDetails}
                      key={index}
                    />
                  )
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserAdsList;
