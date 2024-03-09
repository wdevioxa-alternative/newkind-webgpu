import React, { useState, useContext } from "react";
import style from "./index.module.scss";
import { ReactComponent as ChangesLogIcon } from "./assets/download.svg";
import { UserContext } from "@src/App";
import { ModalWindowConfigurable } from "@src/components/modalConfigurable";

export const ChangesLog = ({ commitBtnClickHandler, releaseID, lang }) => {
  const [isModal, setModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "Внимание!",
    body: "Данная запись будет удалена из списка редактируемых записей",
    okBtn: {
      label: "Удалить",
      handler: () => console.log(111),
    },
    cancelBtn: {
      label: "Отменить",
    },
  });
  const { axiosInstance } = useContext(UserContext);
  const download = async (releaseId, releaseLang) => {
    if (!releaseId || !releaseLang) {
      console.log("No releaseID || lang");
    }
    let releaseID = releaseId;
    let lang = releaseLang;

    try {
      const response = await axiosInstance
        .get(`/v1/release/${releaseID}/lang/${lang}/diff`, {
          responseType: "blob",
        })
        .catch(console.log);
      if (!response) {
        setModal(true);
        setModalConfig({
          title: "Внимание!",
          body:
            "Для данного релиза отсутствует таблица с перечнем изменений, внесенных в версию",
          okBtn: {
            label: "Закрыть",
            handler: () => {
              setModal(false);
            },
          },
        });
        return;
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Изменения в релизе ВОЗ ${releaseID} ${lang}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`ChangesLogComponent ${style.ChangesLog}`}>
      <div
        onClick={() => {
          commitBtnClickHandler && commitBtnClickHandler();
          download(releaseID, lang);
        }}
        className={`${style.ChangesLogText}`}
      >
        Изменения релиза на Портале ВОЗ
      </div>

      <ChangesLogIcon className={`${style.ChangesLogIcon}`} />
      <ModalWindowConfigurable
        setModal={setModal}
        isModal={isModal}
        config={modalConfig}
      />
    </div>
  );
};
