import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Arrow } from "./assets/arrow.svg";
import styles from "./index.module.scss";

export const BackBtn = () => {
  return (
    <NavLink to={'/admin/update'} className={styles.backBtn}>
      <Arrow />
      Назад
    </NavLink>
  );
};
