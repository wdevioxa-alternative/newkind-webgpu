import React from "react";
import { Dropdown } from "../../../../../../../../components/Dropdown";
export const ChangesCommit = ({
  editBtnClickHandler,
  deleteBtnClickHandler,
  type,
}) => {
  console.log(type);
  return type === "multiple" ? (
    <Dropdown
      title={"Внести изменения"}
      editBtnClickHandler={editBtnClickHandler}
      deleteBtnClickHandler={deleteBtnClickHandler}
    />
  ) : (
    <div
      className="border border-[#dcdfe5] p-[10px_22px] text-sm text-[#3256B0] cursor-pointer"
      onClick={editBtnClickHandler}
    >
      Внести изменения
    </div>
  );
};
