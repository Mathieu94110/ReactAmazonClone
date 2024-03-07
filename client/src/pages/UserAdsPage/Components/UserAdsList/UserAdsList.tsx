import React from "react";
import styles from "./UserAdsList.module.scss";

const UserAdsList = ({ ads }) => {
  return (
    <div>
      {ads.map((ad, index) => (
        <p key={index}>{ad.title}</p>
      ))}
    </div>
  );
};

export default UserAdsList;
