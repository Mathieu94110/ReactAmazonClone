import styles from "./AccountModal.module.scss";

function AccountModal({ children, onClose }) {
  return (
    <div className={styles.accountModal}>
      {children}
      <button onClick={onClose}>Fermer</button>
    </div>
  );
}

export default AccountModal;
