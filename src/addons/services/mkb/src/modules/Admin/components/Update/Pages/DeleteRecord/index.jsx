import { useEffect, useState, useContext } from "react";
import styles from "./index.module.scss";
import style from "./index.module.css";

import { BackBtn } from "./components/BackBtn";

import {
  MainButton,
  SecondButton,
} from "../../../../../../components/Button/Button";
import { ModalWindowConfigurable } from "../../../../../../components/modalConfigurable";
import InputSearch from "@src/components/InputSearch";
import InputSearchWithRelease from "./components/InputSearchWithRelease";
import { search } from "@src/utilites/search";
import { getApi } from "@src/utilites/API";
import ModalResultSearch from "@src/components/ModalResultSearch";
import ModalResultSearchNull from "@src/components/ModalResultSearchNull";
// src/utilites/search/index.js
import { TextareaWithClear } from "@src/components/TextareaWithClear";
import { Dropdown } from "./components/Dropdown";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import deleteImg from "./assets/delete.svg";
import infoImg from "./assets/info.svg";
import { UserContext } from "@src/App";

// 1 title (Заголовок)
// 2 inclusion (Включения)
// 3 definition (Описание)
// 4 exclusion (Исключения)
// 5 codingNote (Примечание к кодированию)
// 6 longDefinition (Диагностические требования)
// 7 indexTerm (Совпадающие термины)
// 8 synonym (Синонимы)
// 9 fullySpecifiedName (Полностью уточненное наименование)

const RecordPropMultiple = ({
  title,
  arrayItems,
  activeItem,
  setActiveItem,
  placeholder,
  clickIconHandler,
}) => {
  const newValueIsInvalid = !!(
    !activeItem.newValue.length && activeItem.basisOfChange.length
  );
  const newValueReasonIsInvalid = !!(
    activeItem.newValue.length && !activeItem.basisOfChange.length
  );
  const isDisabled =
    (activeItem.newValue.length && !activeItem.basisOfChange.length) ||
    (!activeItem.newValue.length && activeItem.basisOfChange.length);

  return (
    <>
      <tr
        className={
          (activeItem.deleted && "opacity-50 bg-[#ccc] relative z-10") || ""
        }
      >
        <td> {title}</td>
        <td>
          <Dropdown
            list={arrayItems}
            selectedItem={activeItem}
            setSelectedItem={setActiveItem}
            isDisabled={isDisabled}
          />
        </td>
        {/* <td className={(activeItem.deleted && "pointer-events-none") || ""}>
          <TextareaWithClear
            value={activeItem.newValue}
            onChangeHandler={(e) => {
              setActiveItem((prev) => ({
                ...prev,
                newValue: e,
              }));
            }}
            cn={newValueIsInvalid ? "!border !border-[#C61C1C]" : ""}
          />
          {newValueIsInvalid && (
            <div className="text-[#C61C1C]">Не может быть пустым</div>
          )}
        </td>
        <td className={(activeItem.deleted && "pointer-events-none") || ""}>
          <TextareaWithClear
            placeholder={placeholder}
            value={activeItem.basisOfChange}
            onChangeHandler={(e) => {
              console.log(e);
              setActiveItem((prev) => ({
                ...prev,
                basisOfChange: e,
              }));
              // console.log(activeItem);
            }}
            cn={newValueReasonIsInvalid ? "!border !border-[#C61C1C]" : ""}
          />
          {newValueReasonIsInvalid && (
            <div className="text-[#C61C1C]">Не может быть пустым</div>
          )}
        </td>
        <td className="align-middle text-center">
          <button
            onClick={() =>
              !activeItem.deleted && arrayItems.length && clickIconHandler()
            }
          >
            <img src={deleteImg} className="m-0" alt="" />
          </button>
        </td> */}
      </tr>
      {/* {activeItem.deleted && (
        <tr>
          <td></td>
          <td colSpan={4}>
            {" "}
            <div
              className="text-[#FDA52C] flex cursor-pointer w-fit"
              onClick={() => {
                setActiveItem((prev) => ({
                  ...prev,
                  deleted: false,
                }));
              }}
            >
              <img src={infoImg} className="m-0 mr-4 p-0" alt="" /> Вернуть
              удаленное значение
            </div>
          </td>
        </tr>
      )} */}
    </>
  );
};
const RecordProp = ({
  title,
  defaultValue,
  newValue,
  newValueHandler,
  newValueReason,
  newValueReasonHandler,
  placeholder,
  // checkIsValid,
}) => {
  // const isValid =
  // (newValue.length && !newValueReason.length) ||
  // (!newValue.length && newValueReason.length) ||
  // !!newValue.length && !!newValueReason.length;
  // checkIsValid && checkIsValid(isValid);
  const newValueIsInvalid = !!(!newValue.length && newValueReason.length);
  const newValueReasonIsInvalid = !!(newValue.length && !newValueReason.length);
  return (
    <tr>
      <td>{title}</td>
      <td>
        <textarea
          type="text"
          // defaultValue={"2А00 Новообразования головного мозга"}
          value={defaultValue}
          disabled={true}
        />
      </td>
      {/* <td>
        <TextareaWithClear
          value={newValue}
          onChangeHandler={newValueHandler}
          cn={newValueIsInvalid ? "!border !border-[#C61C1C]" : ""}
        />
        {newValueIsInvalid && (
          <div className="text-[#C61C1C]">Не может быть пустым</div>
        )}
      </td>
      <td>
        <TextareaWithClear
          placeholder={placeholder}
          value={newValueReason}
          onChangeHandler={newValueReasonHandler}
          cn={newValueReasonIsInvalid ? "!border !border-[#C61C1C]" : ""}
        />
        {newValueReasonIsInvalid && (
          <div className="text-[#C61C1C]">Не может быть пустым</div>
        )}
      </td>
      <td></td> */}
    </tr>
  );
};

const processRawData = (rawList) => {
  if (!rawList) return;
  return rawList?.map((item) => ({
    whoValue: item?.label["@value"],
    newValue: "",
    basisOfChange: "",
    deleted: false,
  }));
};

export const DeleteRecord = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [formIsValid, setFormIsValid] = useState(false);

  const [reasonForDelete, setReasonForDelete] = useState("");

  const [deseaseData, setDeseaseData] = useState(null);
  const [deseaseDataEntity, setDeseaseDataEntity] = useState(null);

  const [newTitle, setNewTitle] = useState("");
  const [newTitleReason, setNewTitleReason] = useState("");
  const [newTitleIsValid, setNewTitleIsValid] = useState(false);

  const [newDefinition, setNewDefinition] = useState("");
  const [newDefinitionReason, setNewDefinitionReason] = useState("");
  const [newDefinitionIsValid, setNewDefinitionIsValid] = useState(false);

  const [newLongDefinition, setNewLongDefinition] = useState("");
  const [newLongDefinitionReason, setNewLongDefinitionReason] = useState("");
  const [newLongDefinitionIsValid, setNewLongDefinitionIsValid] = useState(
    false
  );

  const [newCodingNote, setNewCodingNote] = useState("");
  const [newCodingNoteReason, setNewCodingNoteReason] = useState("");
  const [newCodingNoteIsValid, setNewCodingNoteIsValid] = useState(false);

  const [newFullySpecifiedName, setNewFullySpecifiedName] = useState("");
  const [
    newFullySpecifiedNameReason,
    setNewFullySpecifiedNameReason,
  ] = useState("");
  const [
    newFullySpecifiedNameIsValid,
    setNewFullySpecifiedNameIsValid,
  ] = useState(false);

  const [synonym, setSynonym] = useState([]);
  const [selectedSynonym, setSelectedSynonym] = useState({});
  const [synonymIsValid, setSynonymIsValid] = useState(false);

  const [indexTerm, setIndexTerm] = useState([]);
  const [selectedIndexTerm, setSelectedIndexTerm] = useState({});
  const [indexTermIsValid, setIndexTermIsValid] = useState(false);

  const [inclusion, setInclusion] = useState([]);
  const [selectedInclusion, setSelectedInclusion] = useState({});
  const [inclusionIsValid, setInclusionIsValid] = useState(false);

  const [exclusion, setExclusion] = useState([]);
  const [selectedExclusion, setSelectedExclusion] = useState({});
  const [exclusionIsValid, setExclusionIsValid] = useState(false);

  const [isModal, setIsModal] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    title: "Успешная операция!",
    body: `Данная запись была успешно отредактирована. Вы будете перенаправлены на список записей релиза ${params.releaseId}`,
    okBtn: {
      label: "Перейти",
      handler: () => {
        console.log(111);
        // navigate();
        // `/admin/edit-release/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}/edit-record/${item.entityId}/${item.id}/`
      },
    },
    cancelBtn: {
      label: "Отменить",
    },
  });

  const [isChangeLoading, setIsChangeLoading] = useState(false);

  const { axiosInstance } = useContext(UserContext);

  useEffect(() => {
    setFormIsValid(!!reasonForDelete.length);
  }, [reasonForDelete]);

  const api = axios.create({
    baseURL: `https:mkb11-compose-dev.digitalms.ru/`,
  });

  useEffect(() => {
    return () => {
      localStorage.removeItem("releaseId");
      localStorage.removeItem("releaseLang");
    };
  }, []);

  const changeRecordHandler = async () => {
    setIsChangeLoading(true);

    try {
      console.log(deseaseData);
      const { status } = await axiosInstance.post(
        `/v1/release/${params.releaseId}/lang/${params.releaseLang}/changes`,
        {
          entityID: Number(deseaseData.entityId),
          residual: "",
          editType: 2,
          status: 1,
          code: deseaseData?.entity?.code,
          basisOfChange: reasonForDelete,
          attributeChanges: [],
        }
      );
      if (status === 200) {
        setIsChangeLoading(false);

        // setIsModal(true);
        // setModalConfig({
        //   title: "Успешная операция!",
        //   body: `Данная запись была успешно добавлена в список для удаления. Хотите перейти в список?`,
        //   okBtn: {
        //     label: "Перейти",
        //     handler: () => {
        //       setIsModal(false);
        //       navigate(
        //         `/admin/deleted-records-list/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}`
        //       );
        //     },
        //   },
        //   cancelBtn: {
        //     label: "Отменить",
        //     handler: () => {
        //       setIsModal(false);
        //       setDeseaseData(null);
        //       setDeseaseDataEntity(null);
        //     },
        //   },
        // });
        navigate(
          `/admin/deleted-records-list/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}`
        );
      }
    } catch (error) {
      console.log(error);
      setIsChangeLoading(false);
    }

    // .then(({ data }) => {
    //   console.log(data);
    //   if (data.status === 200) {
    //     setIsModal(true);
    //     setModalConfig({
    //       title: "Успешная операция!",
    //       body: `Данная запись была успешно добавлена в список для удаления. Хотите перейти в список?`,
    //       okBtn: {
    //         label: "Перейти",
    //         handler: () => {
    //           setIsModal(false);
    //           navigate(
    //             `/admin/deleted-records-list/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}`
    //           );
    //         },
    //       },
    //       cancelBtn: {
    //         label: "Отменить",
    //       },
    //     });
    //   }
    // })
    // .catch(() => {
    //   setIsModal(true);
    //   setModalConfig({
    //     title: "Ошибка!",
    //     body: `В процессе сохранения произошла ошибка. Попробуйте повторить процедуру позднее.`,
    //     okBtn: {
    //       label: "Закрыть",
    //       handler: () => {
    //         // navigate(
    //         //   `/admin/edit-release/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}`
    //         // );
    //         setIsModal(false);
    //       },
    //     },
    //     // cancelBtn: {
    //     //   label: "Отменить",
    //     // },
    //   });
    // })
    // .finally(() => setIsChangeLoading(false));
  };

  useEffect(() => {
    if (!deseaseData) return;
    if (!deseaseData.entityId) {
      let entityId = deseaseData.id;
      if (!entityId && deseaseData.uri) {
        const entityId = deseaseData.uri.split("/").reverse()[0];
        entityId &&
          setDeseaseData((prev) => {
            prev.entityId = entityId;
            return prev;
          });
      } else
        setDeseaseData((prev) => {
          prev.entityId = entityId;
          return prev;
        });
    }
    axiosInstance
      .get(`/v1/release/${params.releaseId}/lang/${params.releaseLang}/changes`)
      .then(({ data: { changes } }) => {
        const recordAlreadyDeleted = changes?.filter(
          (item) =>
            item.code === deseaseData.code && item.editType === "deleted"
        )[0];

        console.log(recordAlreadyDeleted);
        if (recordAlreadyDeleted) {
          setDeseaseData(null);
          setDeseaseDataEntity(null);
          setIsModal(true);
          setModalConfig({
            title: "Внимание!",
            body: `Данная запись уже была добавлена в список для удаления. Повторная операция с данной записью невозможна.`,
            okBtn: {
              label: "Понятно",
              handler: () => {
                setIsModal(false);
              },
            },
          });
        } else setDeseaseDataEntity(deseaseData?.entity);
      })
      .catch(console.log);
  }, [deseaseData]);

  useEffect(() => {
    // setDeseaseDataEntity(deseaseData?.entity);
    if (deseaseData?.entityId) {
      axiosInstance
        .get(
          `/testing/v1/icd/entity/${deseaseData?.entityId}?releaseId=${params.releaseId}`,
          {
            headers: {
              "Accept-Language": `${params.releaseLang}`,
            },
          }
        )
        .then(({ data }) => {
          // console.log(data);
          if (data?.synonym?.length) {
            const synonym = processRawData(data?.synonym);
            setSynonym(synonym);
            setSelectedSynonym(synonym[0]);
          } else {
            setSynonym([]);
            setSelectedSynonym({});
          }
        })
        .catch(console.log);
    }
  }, [deseaseDataEntity]);

  // useEffect(() => {
  //   console.log(deseaseDataEntity?.code);
  //   console.log(changes);
  //   if (params.changeId) return;
  //   changes.forEach((item) => {
  //     item.code === deseaseDataEntity?.code && setIsModalRedirect(true);
  //     setOkBtnModalRedirectHandler(() => () => {
  //       setIsModalRedirect(false);
  //       navigate(
  //         `/admin/edit-release/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}/edit-record/${item.entityId}/${item.id}/`
  //       );
  //     });
  //   });
  // }, [deseaseDataEntity]);

  useEffect(() => {
    if (deseaseDataEntity?.indexTerm?.length) {
      const indexTerm = processRawData(deseaseDataEntity?.indexTerm);
      setIndexTerm(indexTerm);
      setSelectedIndexTerm(indexTerm[0]);
    } else {
      setIndexTerm([]);
      setSelectedIndexTerm({});
    }
    if (deseaseDataEntity?.inclusion?.length) {
      const inclusion = processRawData(deseaseDataEntity?.inclusion);
      setInclusion(inclusion);
      setSelectedInclusion(inclusion[0]);
    } else {
      setInclusion([]);
      setSelectedInclusion({});
    }
    if (deseaseDataEntity?.exclusion?.length) {
      const exclusion = processRawData(deseaseDataEntity?.exclusion);
      setExclusion(exclusion);
      setSelectedExclusion(exclusion[0]);
    } else {
      setExclusion([]);
      setSelectedExclusion({});
    }
  }, [deseaseDataEntity]);

  useEffect(() => {
    setNewTitleIsValid(!!newTitle && !!newTitleReason);
  }, [newTitle, newTitleReason]);

  useEffect(() => {
    setNewDefinitionIsValid(!!newDefinition && !!newDefinitionReason);
  }, [newDefinition, newDefinitionReason]);

  useEffect(() => {
    setNewLongDefinitionIsValid(
      !!newLongDefinition && !!newLongDefinitionReason
    );
  }, [newLongDefinition, newLongDefinitionReason]);

  useEffect(() => {
    setNewCodingNoteIsValid(!!newCodingNote && !!newCodingNoteReason);
  }, [newCodingNote, newCodingNoteReason]);

  useEffect(() => {
    setNewFullySpecifiedNameIsValid(
      !!newFullySpecifiedName && !!newFullySpecifiedNameReason
    );
  }, [newFullySpecifiedName, newFullySpecifiedNameReason]);

  useEffect(() => {
    const data = indexTerm.map((item) => {
      if (item.whoValue === selectedIndexTerm.whoValue)
        return selectedIndexTerm;
      return item;
    });
    const isReadyForChange = data.filter(
      (prop) => (prop.newValue && prop.basisOfChange) || prop.deleted
    )[0];
    setIndexTerm(data);
    setIndexTermIsValid(!!isReadyForChange);
  }, [selectedIndexTerm]);

  useEffect(() => {
    const data = synonym.map((item) => {
      if (item.whoValue === selectedSynonym.whoValue) return selectedSynonym;
      return item;
    });
    const isReadyForChange = data.filter(
      (prop) => (prop.newValue && prop.basisOfChange) || prop.deleted
    )[0];
    setSynonym(data);
    setSynonymIsValid(!!isReadyForChange);
  }, [selectedSynonym]);

  useEffect(() => {
    const data = inclusion.map((item) => {
      if (item.whoValue === selectedInclusion.whoValue)
        return selectedInclusion;
      return item;
    });
    const isReadyForChange = data.filter(
      (prop) => (prop.newValue && prop.basisOfChange) || prop.deleted
    )[0];
    setInclusion(data);
    setInclusionIsValid(!!isReadyForChange);
  }, [selectedInclusion]);

  useEffect(() => {
    const data = exclusion.map((item) => {
      if (item.whoValue === selectedExclusion.whoValue)
        return selectedExclusion;
      return item;
    });
    const isReadyForChange = data.filter(
      (prop) => (prop.newValue && prop.basisOfChange) || prop.deleted
    )[0];
    setExclusion(data);
    setExclusionIsValid(!!isReadyForChange);
  }, [selectedExclusion]);

  // useEffect(() => {
  //   const newIndexTerm = indexTerm?.map((item) => {
  //     if (item.whoValue === selectedIndexTerm.whoValue)
  //       return {
  //         ...item,
  //         newValue: selectedIndexTerm.newValue,
  //         basisOfChange: selectedIndexTerm.basisOfChange,
  //       };
  //     return item;
  //   });
  //   setIndexTerm(newIndexTerm);
  // }, [selectedIndexTerm]);
  return (
    <div className={styles.ChangesReviewPage}>
      <BackBtn
        goBack={() =>
          navigate(
            `/admin/deleted-records-list/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}`
          )
        }
      />
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>Запись для удаления</h2>
          {/* <div className={styles.commited}>
            <Commited />
            Изменения зафиксированы
            <br />
            16.10.2023 14:15
          </div> */}
        </div>
        <div className={styles.headerBottom}>
          {/* <div className={styles.subtitle}>
            <AddBtn />
          </div>
          <div className={styles.download}>
            <Download />
            Выгрузить
          </div> */}
          <div className={style.search}>
            <InputSearchWithRelease
              setDeseaseData={setDeseaseData}
              releaseGroup={params.releaseGroup}
              releaseId={params.releaseId}
              releaseLang={params.releaseLang}
            />
          </div>
        </div>
      </div>
      {!deseaseDataEntity ? (
        <div className="mt-8 font-semibold">
          Для отображения записи введите код заболевания или название в строке
          поиска{" "}
        </div>
      ) : (
        <div className={styles.body}>
          {/* <table>
            <thead>
              <tr>
                <th></th>
                <th>Значение ВОЗ</th>
              </tr>
            </thead>
            <tbody>
              {deseaseDataEntity?.title && deseaseDataEntity?.title["@value"] && (
                <RecordProp
                  title={"Заголовок"}
                  defaultValue={deseaseDataEntity?.title["@value"]}
                  newValue={newTitle}
                  newValueHandler={setNewTitle}
                  newValueReason={newTitleReason}
                  // newValueReasonHandler={setNewTitleReason}
                  placeholder={"Обязательно для заполнения"}
                  // checkIsValid={setNewTitleIsValid}
                />
              )}
              {deseaseDataEntity?.definition &&
                deseaseDataEntity?.definition["@value"] && (
                  <RecordProp
                    title={"Описание"}
                    defaultValue={deseaseDataEntity?.definition["@value"]}
                    newValue={newDefinition}
                    newValueHandler={setNewDefinition}
                    newValueReason={newDefinitionReason}
                    newValueReasonHandler={setNewDefinitionReason}
                    placeholder={"Обязательно для заполнения"}
                    // checkIsValid={setNewDefinitionIsValid}
                  />
                )}
              {deseaseDataEntity?.longDefinition &&
                deseaseDataEntity?.longDefinition["@value"] && (
                  <RecordProp
                    title={"Диагностические требования"}
                    defaultValue={deseaseDataEntity?.longDefinition["@value"]}
                    newValue={newLongDefinition}
                    newValueHandler={setNewLongDefinition}
                    newValueReason={newLongDefinitionReason}
                    newValueReasonHandler={setNewLongDefinitionReason}
                    placeholder={"Обязательно для заполнения"}
                  />
                )}
              {deseaseDataEntity?.codingNote &&
                deseaseDataEntity?.codingNote["@value"] && (
                  <RecordProp
                    title={"Примечание к кодированию"}
                    defaultValue={deseaseDataEntity?.codingNote["@value"]}
                    newValue={newCodingNote}
                    newValueHandler={setNewCodingNote}
                    newValueReason={newCodingNoteReason}
                    newValueReasonHandler={setNewCodingNoteReason}
                    placeholder={"Обязательно для заполнения"}
                  />
                )}
              {deseaseDataEntity?.fullySpecifiedName &&
                deseaseDataEntity?.fullySpecifiedName["@value"] && (
                  <RecordProp
                    title={"Полностью уточненное наименование"}
                    defaultValue={
                      deseaseDataEntity?.fullySpecifiedName["@value"]
                    }
                    newValue={newFullySpecifiedName}
                    newValueHandler={setNewFullySpecifiedName}
                    newValueReason={newFullySpecifiedNameReason}
                    newValueReasonHandler={setNewFullySpecifiedNameReason}
                    placeholder={"Обязательно для заполнения"}
                  />
                )}

              
              {!!indexTerm.length && (
                <RecordPropMultiple
                  title="Включенные термины"
                  arrayItems={indexTerm}
                  activeItem={selectedIndexTerm}
                  setActiveItem={setSelectedIndexTerm}
                  placeholder={"Обязательно для заполнения"}
                  clickIconHandler={() => {
                    setIsModal(true);
                    setModalConfig({
                      title: "Внимание!",
                      body: `Данная строка будет удалена из списка включенных терминов.`,
                      okBtn: {
                        label: "Удалить",
                        handler: () => {
                          setSelectedIndexTerm((prev) => ({
                            ...prev,
                            deleted: true,
                          }));
                          setIsModal(false);
                        },
                      },
                      cancelBtn: {
                        label: "Отменить",
                      },
                    });
                  }}
                />
              )}
              {!!synonym.length && (
                <RecordPropMultiple
                  title="Синонимы"
                  arrayItems={synonym}
                  activeItem={selectedSynonym}
                  setActiveItem={setSelectedSynonym}
                  placeholder={"Обязательно для заполнения"}
                  clickIconHandler={() => {
                    setIsModal(true);
                    // setOkBtnModalHandler(() => () => {
                    //   setSelectedSynonym((prev) => ({ ...prev, deleted: true }));
                    //   setIsModal(false);
                    // });
                    setModalConfig({
                      title: "Внимание!",
                      body: `Данная строка будет удалена из списка синонимов.`,
                      okBtn: {
                        label: "Удалить",
                        handler: () => {
                          setSelectedSynonym((prev) => ({
                            ...prev,
                            deleted: true,
                          }));
                          setIsModal(false);
                        },
                      },
                      cancelBtn: {
                        label: "Отменить",
                      },
                    });
                  }}
                />
              )}
              {!!inclusion.length && (
                <RecordPropMultiple
                  title="Включения"
                  arrayItems={inclusion}
                  activeItem={selectedInclusion}
                  setActiveItem={setSelectedInclusion}
                  placeholder={"Обязательно для заполнения"}
                  clickIconHandler={() => {
                    setIsModal(true);
                    // setOkBtnModalHandler(() => () => {
                    //   setSelectedInclusion((prev) => ({ ...prev, deleted: true }));
                    //   setIsModal(false);
                    // });
                    setModalConfig({
                      title: "Внимание!",
                      body: `Данная строка будет удалена из списка включений.`,
                      okBtn: {
                        label: "Удалить",
                        handler: () => {
                          setSelectedInclusion((prev) => ({
                            ...prev,
                            deleted: true,
                          }));
                          setIsModal(false);
                        },
                      },
                      cancelBtn: {
                        label: "Отменить",
                      },
                    });
                  }}
                />
              )}
              {!!exclusion.length && (
                <RecordPropMultiple
                  title="Исключения"
                  arrayItems={exclusion}
                  activeItem={selectedExclusion}
                  setActiveItem={setSelectedExclusion}
                  placeholder={"Обязательно для заполнения"}
                  clickIconHandler={() => {
                    setIsModal(true);
                    // setOkBtnModalHandler(() => () => {
                    //   setSelectedExclusion((prev) => ({ ...prev, deleted: true }));
                    //   setIsModal(false);
                    // });
                    setModalConfig({
                      title: "Внимание!",
                      body: `Данная строка будет удалена из списка исключений.`,
                      okBtn: {
                        label: "Удалить",
                        handler: () => {
                          setSelectedExclusion((prev) => ({
                            ...prev,
                            deleted: true,
                          }));
                          setIsModal(false);
                        },
                      },
                      cancelBtn: {
                        label: "Отменить",
                      },
                    });
                  }}
                />
              )}
            </tbody>
          </table> */}
          <div className="mt-6">
            <div className="text-base font-semibold">
              Основание для удаления
            </div>
            <input
              type="text"
              className="w-full p-4 mt-4 border border-[#E5E5EB]"
              onChange={(e) => setReasonForDelete(e.target.value)}
            />
          </div>
          <div className="h-12"></div>
          <div className="flex justify-end">
            <SecondButton
              buttonLabel={"Отменить"}
              buttonCheckImg={false}
              buttonHandler={() => navigate(-1)}
            />
            <div className="w-4"></div>
            <MainButton
              buttonLabel={"Добавить"}
              buttonHandler={() => changeRecordHandler()}
              isLoading={isChangeLoading}
              isDisabled={isChangeLoading || !formIsValid}
              // isDisabled={isChangeLoading || !formIsValid}
            />
          </div>
        </div>
      )}

      {/* <ModalWindowConfigurable
        setModal={setIsModal}
        isModal={isModal}
        config={{
          title: "Внимание!",
          body: "Данное свойство будет удалено из записи",
          okBtn: {
            label: "Удалить",
            handler: () => okBtnModalHandler(),
          },
          cancelBtn: {
            label: "Отменить",
          },
        }}
      /> */}
      <ModalWindowConfigurable
        setModal={setIsModal}
        isModal={isModal}
        config={modalConfig}
      />
      {/* <ModalWindowConfigurable
        setModal={setIsModalRedirect}
        isModal={isModalRedirect}
        config={{
          title: "Успешная операция!",
          body:
            `Данная запись была успешно отредактирована. Вы будете перенаправлены на список записей релиза ${params.releaseId}`,
          okBtn: {
            label: "Перейти",
            handler: () => okBtnModalRedirectHandler(),
          },
          cancelBtn: {
            label: "Отменить",
          },
        }}
      />
           <ModalWindowConfigurable
        setModal={setIsModalAlreadyEdited}
        isModal={isModalRedirect}
        config={{
          title: "Успешная операция!",
          body:
            `Данная запись была успешно отредактирована. Вы будете перенаправлены на список записей релиза ${params.releaseId}`,
          okBtn: {
            label: "Перейти",
            handler: () => okBtnModalRedirectHandler(),
          },
          cancelBtn: {
            label: "Отменить",
          },
        }}
      /> */}
    </div>
  );
};
