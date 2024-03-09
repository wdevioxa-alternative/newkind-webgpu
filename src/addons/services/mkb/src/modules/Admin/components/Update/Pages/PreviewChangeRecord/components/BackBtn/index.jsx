import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Arrow } from "./assets/arrow.svg";
import styles from "./index.module.scss";

export const BackBtn = ({ goBack }) => {
  return (
    // <NavLink to={'/admin/edit-records'} className={styles.backBtn}>
    //   <Arrow />
    //   Назад
    // </NavLink>
    <a onClick={goBack} className={styles.backBtn}>
      <Arrow />
      Назад
    </a>
  );
};
