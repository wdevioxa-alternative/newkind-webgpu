import React from "react";
import { NavLink } from "react-router-dom";
import style from "./index.module.scss";

export const ChangesReview = ({ previewBtnClickHandler }) => {
  return (
    <div className={`ChangesReviewComponent ${style.ChangesReview}`}>
      {/* <NavLink
        to={"/admin/changes-review"}
        className={`${style.ChangesReviewText}`}
      >
        Просмотр изменений
      </NavLink> */}
      <a
        href="#"
        className={`${style.ChangesReviewText}`}
        onClick={(e) => {
          e.preventDefault();
          previewBtnClickHandler();
        }}
      >Просмотр изменений</a>
    </div>
  );
};
