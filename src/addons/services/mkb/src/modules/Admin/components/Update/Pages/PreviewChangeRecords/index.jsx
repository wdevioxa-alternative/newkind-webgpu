import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { ReactComponent as Commited } from "./assets/commited.svg";
import { ReactComponent as Download } from "./assets/download.svg";
import styles from "./index.module.scss";
import { BackBtn } from "./components/BackBtn";
import { AddBtn } from "./components/AddBtn";
import { DotsDropdown } from "../../../../../../components/DotsDropdown";
import { ModalWindowConfigurable } from "../../../../../../components/modalConfigurable";
import {
  MainButton,
  SecondButton,
  DownloadButton,
} from "../../../../../../components/Button/Button";
import { EditRecord } from "../EditRecord";
import { useNavigate, useParams } from "react-router";
import { idKey } from "@src/utilites/idKey";
import { UserContext } from "@src/App";
import { utcToLocal } from "@src/utilites/datetime";

const dictionaryAttribute = {
  1: "Заголовок",
  2: "Включения",
  3: "Описание",
  4: "Исключения",
  5: "Примечание к кодированию",
  6: "Диагностические требования",
  7: "Термин в алфавитном указателе",
  8: "Синонимы",
  9: "Полностью уточненное наименование",
};

const dictionaryAttributeEditType = {
  1: "Изменен",
  2: "Удален",
};

const dictionaryAttributeEditTypeColor = {
  1: "text-[#EF8C03]",
  2: "text-[#C61C1C]",
};

const getDeseaseName = (
  axiosInstance,
  entityId,
  releaseId,
  releaseLang,
  releaseGroup
) => {
  return axiosInstance.get(
    releaseGroup === "testing"
      ? `/testing/v1/icd/entity/${entityId}?releaseId=${releaseId}`
      : `/v1/icd/entity/${entityId}?releaseId=${releaseId}`,
    {
      headers: {
        "Accept-Language": `${releaseLang}`,
      },
    }
  );
};

const getEntityFulfilledDictionary = async (
  axiosInstance,
  changes,
  releaseGroup
) => {
  if (!axiosInstance || !changes.length) return;
  try {
    return await Promise.allSettled(
      changes.map(({ entityId, releaseId, lang }) =>
        getDeseaseName(axiosInstance, entityId, releaseId, lang, releaseGroup)
      )
    );
  } catch (error) {
    console.log(error);
  }
};

export const PreviewChangeRecords = () => {
  const [editedRecords, setEditedRecords] = useState([]);
  const [deletedRecords, setDeletedRecords] = useState([]);
  const [changes, setChanges] = useState([]);
  const [changesInStatusNew, setChangesInStatusNew] = useState([]);

  const [entityNamesDictionary, setEntityNamesDictionary] = useState({});

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

  const { releaseId, releaseLang, releaseGroup } = useParams();

  const navigate = useNavigate();

  const download = async () => {
    let releaseID = releaseId;
    let lang = releaseLang;
    let state = releaseGroup === "testing" ? "2" : "3";

    try {
      const response = await axiosInstance
        .get(
          `/v1/change/release/${releaseID}/lang/${lang}/state/${state}/export?type=1`,
          {
            responseType: "blob",
          }
        )
        .catch(console.log);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Список изменений, внесенных в версию ${releaseID} ${lang}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
    }
  };

  const getChanges = async () => {
    if (releaseId && releaseLang) {
      try {
        const result = await axiosInstance.get(
          `/v1/release/${releaseId}/lang/${releaseLang}/changes`
        );
        const {
          status,
          data: { changes },
        } = result;
        if (status === 200) {
          changes.length && setChanges(changes);
          const filteredChanges =
            releaseGroup === "testing"
              ? changes.filter(
                  (item) => item.status === "new" || item.status === "approved"
                )
              : changes.filter((item) => item.status === "published");

          const editedRecords = filteredChanges.filter(
            (item) => item.editType !== "deleted"
          );
          const deletedRecords = filteredChanges.filter(
            (item) => item.editType === "deleted"
          );
          // console.log(editedRecords);
          // console.log(deletedRecords);
          if (editedRecords.length) {
            setEditedRecords(editedRecords);
          } else setEditedRecords([]);
          if (deletedRecords.length) {
            setDeletedRecords(deletedRecords);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const commitChanges = async (changes) => {
    try {
      Promise.all(
        changes.map(({ id }) =>
          axiosInstance.patch(`/v1/release/changes/${id}`)
        )
      )
        .then(() => {
          setModal(true);
          setModalConfig({
            title: "Успешная операция!",
            body: "Изменения были успешно зафиксированы",
            okBtn: {
              label: "Закрыть",
              handler: () => {
                setModal(false);
              },
            },
          });
        })
        .catch(() => {
          setModal(true);
          setModalConfig({
            title: "Ошибка!",
            body: `В процессе фиксации произошла ошибка. Попробуйте повторить процедуру позднее.`,
            okBtn: {
              label: "Закрыть",
              handler: () => {
                setModal(false);
              },
            },
          });
        });
    } catch (error) {}
  };

  useEffect(() => {
    getEntityFulfilledDictionary(axiosInstance, changes, releaseGroup)
      .then((data) => {
        console.log(data);
        const dic = {};
        data?.length &&
          data.forEach((item) => {
            try {
              const {
                value: { data },
              } = item;
              let id;
              let title;
              id = data["@id"].split("/").reverse()[0];
              title = data.title["@value"];
              dic[id] = title;
            } catch (error) {
              console.log(error);
            }
          });
        setEntityNamesDictionary(dic);
      })
      .catch(console.log);
    setChangesInStatusNew(changes.filter((item) => item.status === "new"));
  }, [changes]);

  const deleteRecord = async (changeId, callback) => {
    try {
      const { status } = await axiosInstance
        .delete(`/v1/release/changes/${changeId}`)
        .catch(console.log);
      if (status === 200) callback();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("releaseId");
      localStorage.removeItem("releaseLang");
    };
  }, []);

  useEffect(() => {
    getChanges();
  }, []);
  return (
    <div className={styles.ChangesReviewPage}>
      <BackBtn />
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>Изменения, внесенные в версию</h2>
          <div className={styles.commited}>
            <Commited />
            Изменения зафиксированы
            <br />
            16.10.2023 14:15
          </div>
        </div>
        <div className={styles.headerBottom}>
          <div className="text-base font-semibold">
            Отредактированные записи
          </div>
          {/* <div className={styles.subtitle}>
            <AddBtn />
          </div> */}
          {/* <MainButton
            buttonLabel={"Добавить запись"}
            buttonHandler={() =>
              navigate(
                `/admin/edited-records-list/${releaseId}/${releaseLang}/${releaseGroup}/new-record`
              )
            }
          /> */}
          {/* <div className={styles.download}>
            <Download />
            Выгрузить
          </div> */}
          <DownloadButton
            buttonLabel={"Выгрузить"}
            buttonHandler={download}
            isDisabled={!editedRecords?.length && !editedRecords?.length}
          />
        </div>
      </div>
      <div className={styles.body}>
        <div className="w-max">
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Код и наименование записи</th>
                <th>Измененные атрибуты</th>
                <th>Состояние атрибута</th>
                <th>Дата и время изменения </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {editedRecords?.map((item, idx) => (
                <tr key={idKey()}>
                  <td>{idx + 1}</td>
                  <td>
                    {item.code}{" "}
                    {entityNamesDictionary[item.entityId] || item.entityId}{" "}
                    {/* {getDeseaseName(
                      axiosInstance,
                      item.entityId,
                      item.releaseId,
                      item.lang
                    )} */}
                  </td>
                  <td>
                    {item.attributeChanges.map((attr, idx) => (
                      <div key={idKey()}>
                        {dictionaryAttribute[attr.attributeType]}
                      </div>
                    ))}
                  </td>
                  <td className={styles.stateDeleted}>
                    {item.attributeChanges.map((attr, idx) => (
                      <div
                        key={idKey()}
                        className={
                          dictionaryAttributeEditTypeColor[
                            attr.attributeEditType
                          ]
                        }
                      >
                        {dictionaryAttributeEditType[attr.attributeEditType]}
                      </div>
                    ))}
                  </td>
                  <td>{utcToLocal(item.changeCreationDate)}</td>
                  <td>
                    <DotsDropdown
                      previewBtnClickHandler={() =>
                        navigate(
                          `/admin/edited-records-list/${releaseId}/${releaseLang}/${releaseGroup}/preview-change-record/${item.entityId}/${item.id}/`
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-base font-semibold my-7">Удаленные записи</div>
          <table className="w-full">
            <thead>
              <tr>
                <th>№</th>
                <th>Код и наименование записи</th>
                <th className="opacity-0">Измененные атрибуты</th>
                <th>Дата и время изменения </th>
                <th className="opacity-0">Состояние атрибута</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {deletedRecords?.map((item, idx) => (
                <tr key={idKey()}>
                  <td>{idx + 1}</td>
                  <td colSpan={2}>
                    {item.code} {item.entityId}
                  </td>
                  {/* <td></td> */}
                  {/* <td></td> */}
                  {/* <td>
                    {item.attributeChanges.map((attr, idx) => (
                      <div key={idKey()}>
                        {dictionaryAttribute[attr.attributeType]}
                      </div>
                    ))}
                  </td>
                  <td className={styles.stateDeleted}>
                    {item.attributeChanges.map((attr, idx) => (
                      <div
                        key={idKey()}
                        className={
                          dictionaryAttributeEditTypeColor[
                            attr.attributeEditType
                          ]
                        }
                      >
                        {dictionaryAttributeEditType[attr.attributeEditType]}
                      </div>
                    ))}
                  </td> */}
                  <td colSpan={2}>{utcToLocal(item.changeCreationDate)}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-5">
            <SecondButton
              buttonLabel={"Зафиксировать изменения"}
              buttonHandler={() => commitChanges(changesInStatusNew)}
              isDisabled={!changesInStatusNew.length}
            />
          </div>
        </div>
      </div>
      <ModalWindowConfigurable
        setModal={setModal}
        isModal={isModal}
        config={modalConfig}
      />
    </div>
    // </div>
  );
};
