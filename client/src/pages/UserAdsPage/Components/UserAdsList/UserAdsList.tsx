import styles from "./UserAdsList.module.scss";
import UserAd from "../UserAd/UserAd";

const UserAdsList = ({ ads }) => {
  const adsCategories = [];
  ads.map((ad) => {
    adsCategories.indexOf(ad.category) < 0 && adsCategories.push(ad.category);
  });
  return (
    <div className="flex-fill">
      {adsCategories.map((cat) => {
        return (
          <div>
            <hr className={styles.categorySeparator} data-content={cat}></hr>
            <div className={`d-flex wrap gap-10 ${styles.userAdContainer}`}>
              {ads.map((ad) => {
                return ad.category === cat && <UserAd ad={ad} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserAdsList;
