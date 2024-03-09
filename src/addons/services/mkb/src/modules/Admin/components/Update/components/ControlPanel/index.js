import React from "react";
import { ChangesLog } from "./components/ChangesLog";
import { ChangesReview } from "./components/ChangesReview";
import { ChangesCommit } from "./components/ChangesCommit";
import styles from "./index.module.scss";

export const ControlPanel = ({
  changesLog,
  changesReview,
  changesCommit,
  editBtnClickHandler,
  deleteBtnClickHandler,
  previewBtnClickHandler,
  commitBtnClickHandler,
  changesCommitType='multiple',
  releaseID,
  lang,
}) => {
  return (
    <>
      <div className={styles.ControlPanel}>
        {changesLog && <ChangesLog commitBtnClickHandler={commitBtnClickHandler} releaseID={releaseID} lang={lang} />}
        {changesReview && <ChangesReview previewBtnClickHandler={previewBtnClickHandler} />}
        {changesCommit && (
          <ChangesCommit
            type={changesCommitType}
            editBtnClickHandler={editBtnClickHandler}
            deleteBtnClickHandler={deleteBtnClickHandler}
          />
        )}
      </div>
    </>
  );
};
