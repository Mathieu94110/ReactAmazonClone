import { Link } from "react-router-dom";
import styles from "./UserProfilePage.module.scss";

const UserProfilePage = () => {
  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.userAccountCategories}>
        <Link to="/user-info" className={styles.userAccountCategory}>
          <div className={styles.userAccountCategoryInner}>
            <img
              src="https://m.media-amazon.com/images/G/08/x-locale/cs/help/images/gateway/self-service/YA_icon_address_01._CB657833298_.png"
              alt="notebook"
            />
            <div className="ml-10">
              <h2 className={styles.userAccountCategoryTtitle}>
                Informations utilisateur
              </h2>
              <div>
                <span>Modifier vos informations utilisateur</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/create-ad" className={styles.userAccountCategory}>
          <div className={styles.userAccountCategoryInner}>
            <img
              src="https://m.media-amazon.com/images/G/08/x-locale/cs/ya/images/amazon_app._CB643878990_.png"
              alt="create ad"
            />
            <div className="ml-10">
              <h2 className={styles.userAccountCategoryTtitle}>
                Créer une annonce
              </h2>
              <div>
                <span>
                  Saisissez les informations demandées et mettez une annonce en
                  ligne,{" "}
                </span>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/user-ads" className={styles.userAccountCategory}>
          <div className={styles.userAccountCategoryInner}>
            <img
              src="https://m.media-amazon.com/images/G/08/x-locale/cs/help/images/gateway/self-service/order._CB659956101_.png"
              alt="ads"
            />
            <div className="ml-10">
              <h2 className={styles.userAccountCategoryTtitle}>Mes annonces</h2>
              <div>
                <span>Consulter ou modifier vos annonces en ligne</span>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/contact" className={styles.userAccountCategory}>
          <div className={styles.userAccountCategoryInner}>
            <img
              src="https://m.media-amazon.com/images/G/08/x-locale/cs/help/images/gateway/self-service/contact_us._CB659956101_.png"
              alt="contact"
            />
            <div className="ml-10">
              <h2 className={styles.userAccountCategoryTtitle}>
                Nous contacter
              </h2>
              <div>
                <span>
                  Contacter notre Service Client par téléphone, chat ou e-mail
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserProfilePage;
