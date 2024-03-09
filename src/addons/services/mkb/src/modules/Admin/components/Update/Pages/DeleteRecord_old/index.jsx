import { useEffect, useState } from "react";
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
  const isDisabled =
    (activeItem?.newValue?.length && !activeItem?.basisOfChange?.length) ||
    (!activeItem?.newValue?.length && activeItem?.basisOfChange?.length);
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
        <td className={(activeItem.deleted && "pointer-events-none") || ""}>
          <TextareaWithClear
            value={activeItem.newValue}
            onChangeHandler={(e) => {
              setActiveItem((prev) => ({
                ...prev,
                newValue: e,
              }));
            }}
          />
          {!!(
            !activeItem?.newValue?.length && activeItem?.basisOfChange?.length
          ) && <div className="text-[#C61C1C]">Не может быть пустым</div>}
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
          />
          {!!(
            activeItem?.newValue?.length && !activeItem?.basisOfChange?.length
          ) && <div className="text-[#C61C1C]">Не может быть пустым</div>}
        </td>
        <td className="align-middle text-center">
          <button
            onClick={() =>
              !activeItem.deleted && arrayItems.length && clickIconHandler()
            }
          >
            <img src={deleteImg} className="m-0" alt="" />
          </button>
        </td>
      </tr>
      {activeItem.deleted && (
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
      )}
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
}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>
        <textarea
          type="text"
          // defaultValue={"2А00 Новообразования головного мозга"}
          defaultValue={defaultValue}
          disabled={true}
        />
      </td>
      <td>
        <TextareaWithClear value={newValue} onChangeHandler={newValueHandler} />
        {!!(!newValue.length && newValueReason.length) && (
          <div className="text-[#C61C1C]">Не может быть пустым</div>
        )}
      </td>
      <td>
        <TextareaWithClear
          placeholder={placeholder}
          value={newValueReason}
          onChangeHandler={newValueReasonHandler}
        />
        {!!(newValue.length && !newValueReason.length) && (
          <div className="text-[#C61C1C]">Не может быть пустым</div>
        )}
      </td>
      <td></td>
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

const getIdFromArr = (arr, attrType, whoValue) => {
  let id;
  arr.forEach((item) => {
    if (item.attributeType === attrType && item.whoValue === whoValue)
      id = item.id;
  });
  return id;
};

export const DeleteRecord = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [formIsValid, setFormIsValid] = useState(false);

  const searchInputIsDisabled = !!params.changeId;

  const [changesForEdit, setChangesForEdit] = useState([]);

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

  const [changes, setChanges] = useState([]);

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

  useEffect(() => {
    // console.log("newTitleIsValid", newTitleIsValid);
    // console.log("newDefinitionIsValid", newDefinitionIsValid);
    // console.log("newLongDefinitionIsValid", newLongDefinitionIsValid);
    // console.log("newCodingNoteIsValid", newCodingNoteIsValid);
    // console.log("newFullySpecifiedNameIsValid", newFullySpecifiedNameIsValid);c
    const isReadyForChange =
      newTitleIsValid ||
      newDefinitionIsValid ||
      newLongDefinitionIsValid ||
      newCodingNoteIsValid ||
      newFullySpecifiedNameIsValid ||
      indexTermIsValid ||
      synonymIsValid ||
      inclusionIsValid ||
      exclusionIsValid;
    setFormIsValid(isReadyForChange);
  }, [
    newTitleIsValid,
    newDefinitionIsValid,
    newLongDefinitionIsValid,
    newCodingNoteIsValid,
    newFullySpecifiedNameIsValid,
    indexTermIsValid,
    synonymIsValid,
    inclusionIsValid,
    exclusionIsValid,
  ]);

  // newValue
  // basisOfChange
  // const API_DATA = getApi();
  // const [toc, setToc] = useState([
  //   {
  //     children: [1],
  //     id: 0,
  //     name: "",
  //     parent: null,
  //   },
  //   {
  //     id: 1,
  //     parent: 0,
  //     link: `/v1/icd/release/11/${API_DATA.Release}/mms`,
  //   },
  // ]);
  // const onClickCloseMainModalResultSearch = () => {
  //   setIsMainModalResultSearch(false);
  //   setInfoMainModalResultSearch();
  // };

  // const resultMainSearch = async (value) => {
  //   try {
  //     if (value) {
  //       let response = [];
  //       const responseWord = await search.getResultMain(value);
  //       let responseCode;
  //       if (value.length < 8) {
  //         responseCode = await search.api.apiSearchCode(value);
  //         if (responseCode.length > 0) response = responseCode;
  //       }
  //       if (responseWord.length > 0) response = responseWord;
  //       if (response && response.length > 0) {
  //         setIsMainModalResultSearchNull(false);
  //         setIsMainModalResultSearch(true);
  //         setInfoMainModalResultSearch(response);
  //       } else if (response && response.length === 0 && value.length >= 3) {
  //         setIsMainModalResultSearch(false);
  //         setIsMainModalResultSearchNull(true);
  //         setInfoMainModalResultSearch();
  //       } else {
  //         setIsMainModalResultSearchNull(false);
  //         setIsMainModalResultSearch(false);
  //         setInfoMainModalResultSearch();
  //       }
  //     } else {
  //       setIsMainModalResultSearchNull(false);
  //       setIsMainModalResultSearch(false);
  //       setInfoMainModalResultSearch();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const api = axios.create({
    // baseURL: process.env.REACT_APP_DEV_URL,
    baseURL: "https://mkb11-compose-dev.digitalms.ru/",
  });

  // api
  //   .get(`/v1/icd/entity/${params?.entityId}?releaseId=${params.releaseId}`, {
  //     headers: {
  //       "Accept-Language": `${params.releaseLang}`,
  //     },
  //   })
  //   .then(({ data }) => {
  //     console.log(data);
  // if (data?.synonym?.length) {
  //   const synonym = processRawData(data?.synonym);
  //   setSynonym(synonym);
  //   setSelectedSynonym(synonym[0]);
  // } else {
  //   setSynonym([]);
  //   setSelectedSynonym({});
  // }
  // });

  useEffect(() => {
    return () => {
      localStorage.removeItem("releaseId");
      localStorage.removeItem("releaseLang");
    };
  }, []);

  useEffect(() => {
    params.releaseId &&
      params.releaseLang &&
      api
        .get(
          `/v1/release/${params.releaseId}/lang/${params.releaseLang}/changes`
        )
        .then(({ data: { changes } }) => {
          console.log(changes);
          setChanges(changes.length ? changes : []);
        })
        .catch(console.log);
  }, [params]);

  useEffect(() => {
    // if (params.changeId) {
    //   api
    //     .get(
    //       `/v1/release/${params.releaseId}/lang/${params.releaseLang}/changes`
    //     )
    //     .then(({ data: { changes } }) => {
    const recordChanges = changes.filter(
      (item) => item.id === +params.changeId && item
    );
    const { attributeChanges } = recordChanges[0] ?? {};
    if (recordChanges[0]) {
      if (recordChanges[0]?.entityId) {
        api
          .get(
            `/v1/icd/entity/${recordChanges[0]?.entityId}?releaseId=${params.releaseId}`,
            {
              headers: {
                "Accept-Language": `${params.releaseLang}`,
              },
            }
          )
          .then(({ data }) => {
            console.log(data);
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
    }

    setChangesForEdit(attributeChanges);
    const dataEntity = {};
    dataEntity.code = recordChanges[0]?.code;
    attributeChanges?.forEach((item) => {
      if (item.attributeType === 1) {
        dataEntity.title = { "@value": item.whoValue };
        setNewTitle(item.newValue);
        setNewTitleReason(item.basisOfChange);
      }
      if (item.attributeType === 3) {
        dataEntity.definition = { "@value": item.whoValue };
        setNewDefinition(item.newValue);
        setNewDefinitionReason(item.basisOfChange);
      }
      if (item.attributeType === 5) {
        dataEntity.codingNote = { "@value": item.whoValue };
        setNewCodingNote(item.newValue);
        setNewCodingNoteReason(item.basisOfChange);
      }
      if (item.attributeType === 6) {
        dataEntity.longDefinition = { "@value": item.whoValue };
        setNewLongDefinition(item.newValue);
        setNewLongDefinitionReason(item.basisOfChange);
      }
      if (item.attributeType === 9) {
        dataEntity.fullySpecifiedName = { "@value": item.whoValue };
        setNewFullySpecifiedName(item.newValue);
        setNewFullySpecifiedNameReason(item.basisOfChange);
      }
      if (item.attributeType === 2) {
        const { whoValue, newValue, basisOfChange, attributeEditType } = item;
        setInclusion((prev) => {
          const newArr = [...prev];
          newArr.push({
            whoValue,
            newValue,
            basisOfChange,
            deleted: attributeEditType === 2 ? true : false,
          });
          setSelectedInclusion(newArr[0]);
          return newArr;
        });
      }
      if (item.attributeType === 4) {
        const { whoValue, newValue, basisOfChange, attributeEditType } = item;
        setExclusion((prev) => {
          const newArr = [...prev];
          newArr.push({
            whoValue,
            newValue,
            basisOfChange,
            deleted: attributeEditType === 2 ? true : false,
          });
          setSelectedExclusion(newArr[0]);
          return newArr;
        });
      }
      if (item.attributeType === 7) {
        const { whoValue, newValue, basisOfChange, attributeEditType } = item;
        setIndexTerm((prev) => {
          const newArr = [...prev];
          newArr.push({
            whoValue,
            newValue,
            basisOfChange,
            deleted: attributeEditType === 2 ? true : false,
          });
          setSelectedIndexTerm(newArr[0]);
          return newArr;
        });
      }
      if (item.attributeType === 8) {
        const { whoValue, newValue, basisOfChange, attributeEditType } = item;
        setSynonym((prev) => {
          const newArr = [...prev];
          newArr.push({
            whoValue,
            newValue,
            basisOfChange,
            deleted: attributeEditType === 2 ? true : false,
          });
          setSelectedSynonym(newArr[0]);
          return newArr;
        });
      }
    });
    setDeseaseDataEntity(dataEntity);
    // setChanges(changes.length ? changes : []);
    // });
    // }
  }, [changes]);

  const resetDeseaseData = async () => {
    // await setDeseaseData(null);
    await setDeseaseDataEntity(null);
    await setNewTitle("");
    await setNewTitleReason("");
    await setNewDefinition("");
    await setNewDefinitionReason("");
    await setNewLongDefinition("");
    await setNewLongDefinitionReason("");
    await setNewCodingNote("");
    await setNewCodingNoteReason("");
    await setNewFullySpecifiedName("");
    await setNewFullySpecifiedNameReason("");
    await setSynonym([]);
    await setIndexTerm([]);
    await setInclusion([]);
    await setExclusion([]);
  };

  const changeRecordHandler = () => {
    const attributeChanges = [];
    newTitle &&
      newTitleReason &&
      attributeChanges.push({
        attributeType: 1,
        attributeEditType: 1,
        whoValue: deseaseDataEntity.title["@value"],
        newValue: newTitle,
        basisOfChange: newTitleReason,
      });
    newDefinition &&
      newDefinitionReason &&
      attributeChanges.push({
        attributeType: 3,
        attributeEditType: 1,
        whoValue: deseaseDataEntity.definition["@value"],
        newValue: newDefinition,
        basisOfChange: newDefinitionReason,
      });
    newLongDefinition &&
      newLongDefinitionReason &&
      attributeChanges.push({
        attributeType: 6,
        attributeEditType: 1,
        whoValue: deseaseDataEntity.longDefinition["@value"],
        newValue: newLongDefinition,
        basisOfChange: newLongDefinitionReason,
      });
    newCodingNote &&
      newCodingNoteReason &&
      attributeChanges.push({
        attributeType: 5,
        attributeEditType: 1,
        whoValue: deseaseDataEntity.codingNote["@value"],
        newValue: newCodingNote,
        basisOfChange: newCodingNoteReason,
      });
    newFullySpecifiedName &&
      newFullySpecifiedNameReason &&
      attributeChanges.push({
        attributeType: 9,
        attributeEditType: 1,
        whoValue: deseaseDataEntity.fullySpecifiedName["@value"],
        newValue: newFullySpecifiedName,
        basisOfChange: newFullySpecifiedNameReason,
      });
    indexTerm?.length &&
      indexTerm.forEach(({ whoValue, newValue, basisOfChange, deleted }) => {
        // console.log(whoValue, newValue, basisOfChange)

        if (deleted) {
          attributeChanges.push({
            attributeType: 7,
            attributeEditType: 2,
            whoValue,
            newValue,
            basisOfChange,
          });
          return;
        }

        whoValue &&
          newValue &&
          basisOfChange &&
          attributeChanges.push({
            attributeType: 7,
            attributeEditType: 1,
            whoValue,
            newValue,
            basisOfChange,
          });
      });
    synonym?.length &&
      synonym.forEach(({ whoValue, newValue, basisOfChange }) => {
        whoValue &&
          newValue &&
          basisOfChange &&
          attributeChanges.push({
            attributeType: 8,
            attributeEditType: 1,
            whoValue,
            newValue,
            basisOfChange,
          });
      });

    inclusion?.length &&
      inclusion.forEach(({ whoValue, newValue, basisOfChange }) => {
        whoValue &&
          newValue &&
          basisOfChange &&
          attributeChanges.push({
            attributeType: 2,
            attributeEditType: 1,
            whoValue,
            newValue,
            basisOfChange,
          });
      });

    exclusion?.length &&
      exclusion.forEach(({ whoValue, newValue, basisOfChange }) => {
        whoValue &&
          newValue &&
          basisOfChange &&
          attributeChanges.push({
            attributeType: 4,
            attributeEditType: 1,
            whoValue,
            newValue,
            basisOfChange,
          });
      });

    attributeChanges.forEach((item) => {
      item.id = getIdFromArr(changesForEdit, item.attributeType, item.whoValue);
    });
    setIsChangeLoading(true);
    // return;
    api
      .put(`/v1/release/changes/${params.changeId}`, {
        releaseId: params.releaseId,
        lang: params.releaseLang,
        entityId: +params.entityId,
        residual: "",
        editType: 1,
        code: deseaseDataEntity.code,
        attributeChanges,
      })
      .then(({ data }) => {
        // if (data.status === 200) {
        setIsModal(true);
        setModalConfig({
          title: "Успешная операция!",
          body: `Данная запись была успешно отредактирована. Вы будете перенаправлены на список записей релиза ${params.releaseId}`,
          okBtn: {
            label: "Перейти",
            handler: () => {
              setIsModal(false);
              navigate(
                `/admin/edited-records-list/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}`
              );
            },
          },
          cancelBtn: {
            label: "Продолжить редактирование",
            handler: () => {
              setIsModal(false);
            },
          },
        });
      })
      .catch(() => {
        setIsModal(true);
        setModalConfig({
          title: "Ошибка!",
          body: `В процессе сохранения произошла ошибка. Попробуйте повторить процедуру позднее.`,
          okBtn: {
            label: "Закрыть",
            handler: () => {
              // navigate(
              //   `/admin/edit-release/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}`
              // );
              setIsModal(false);
            },
          },
          // cancelBtn: {
          //   label: "Отменить",
          // },
        });
      })
      .finally(() => setIsChangeLoading(false));

    // api.patch(
    //   `/v1/release/${window.localStorage.getItem("releaseId")}/changes`,
    //   {
    //     "entityID": 250688797,
    //     "residual": "111",
    //     "editType": 1,
    //     "status": 1,
    //     "code": "1A04",
    //     "attributeChanges": [
    //       {
    //         "attributeType": 3,
    //         "attributeEditType": 1,
    //         "whoValue": "Заболевание толстой кишки, вызванное Clostridium difficile. Проявляется в виде колита, диареи, болей в животе и лихорадки. Передача обычно происходит при прямом или косвенном контакте или при нарушении нормальной бактериальной флоры толстой кишки. Подтверждением является идентификация Clostridium difficile в фекалиях.",
    //         "newValue": "Заболевание толстой кишки, вызванное Clostridium difficile. Проявляется в виде колита, диареи, болей в животе и лихорадки. Передача обычно происходит при прямом или косвенном контакте или при нарушении нормальной бактериальной флоры толстой кишки. Подтверждением является идентификация Clostridium difficile в фекалиях",
    //         "basisOfChange": "Постановление 1"
    //       },
    //       {
    //         "attributeType": 4,
    //         "attributeEditType": 1,
    //         "whoValue": "Некротизирующий энтероколит у новорожденного",
    //         "newValue": "Некротизирующий Энтероколит у новорожденного.",
    //         "basisOfChange": "Постановление 2"
    //       }
    //     ]
    //   }
    // );
    // api.get("/v1/release/changes");
    // api.get("/v1/icd/entity/854137188?releaseId=2023-01", {
    //   headers: {
    //     'Accept-Language': 'ru'
    //   }
    // });
  };

  const setProcessedData = async (data, setter) => {
    // await sette([]);
    //   // console.log(data);
    // await setIndexTerm(processRawData(data));
    try {
      await setter(processRawData(data));
      console.log(3333333);
      console.log(indexTerm);
    } catch (error) {
      console.log(error);
    }
  };

  // const setNewIndexTerm = async (data) => {
  //   await setIndexTerm([]);
  //   // console.log(data);
  //   await setIndexTerm(processRawData(data));
  // };

  // const setNewSynonym = async (data) => {
  //   await setSynonym([]);
  //   // console.log(data);
  //   await setSynonym(processRawData(data));
  // };

  // const setNewInclusion = async (data) => {
  //   await setInclusion([]);
  //   // console.log(data);
  //   await setInclusion(processRawData(data));
  // };

  // const setNewExclusion = async (data) => {
  //   await setExclusion([]);
  //   // console.log(data);
  //   await setExclusion(processRawData(data));
  // };

  useEffect(() => {
    console.log(1111111111111);
    console.log(deseaseData);
    console.log(1111111111111);
    // if (deseaseData) {
    // const cachedDeseaseData = deseaseData;
    // resetDeseaseData().then(() => {

    // if (!params.changeId) {
    api
      .get(`/v1/release/${params.releaseId}/lang/${params.releaseLang}/changes`)
      .then(({ data: { changes } }) => {
        const recordChanges = changes.filter(
          (item) => item.id === +params.changeId
        )[0];
        console.log(recordChanges);
        // const { attributeChanges } = recordChanges[0] ?? {};
        // setChangesForEdit(attributeChanges);
        // const dataEntity = {};
        // dataEntity.code = recordChanges[0]?.code;
      })
      .catch(console.log);
    // }

    // setProcessedData(deseaseData?.entity?.indexTerm, setIndexTerm);
    // setNewInclusion(deseaseData?.entity?.inclusion);
    // setNewExclusion(deseaseData?.entity?.exclusion);
    // });
    // }
  }, [deseaseData]);

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
    if (params.changeId) return;
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

  // useEffect(() => {
  //   const data = indexTerm.map((item) => {
  //     if (item.whoValue === selectedIndexTerm.whoValue)
  //       return selectedIndexTerm;
  //     return item;
  //   });
  //   setIndexTerm(data);
  // }, [selectedIndexTerm]);

  // useEffect(() => {
  //   const data = synonym.map((item) => {
  //     if (item.whoValue === selectedSynonym.whoValue) return selectedSynonym;
  //     return item;
  //   });
  //   setSynonym(data);
  // }, [selectedSynonym]);

  // useEffect(() => {
  //   const data = inclusion.map((item) => {
  //     if (item.whoValue === selectedInclusion.whoValue)
  //       return selectedInclusion;
  //     return item;
  //   });
  //   setInclusion(data);
  // }, [selectedInclusion]);

  // useEffect(() => {
  //   const data = exclusion.map((item) => {
  //     if (item.whoValue === selectedExclusion.whoValue)
  //       return selectedExclusion;
  //     return item;
  //   });
  //   setExclusion(data);
  // }, [selectedExclusion]);

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
      <BackBtn goBack={() => navigate(-1)} />
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>Выбор записи для редактирования</h2>
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
          {/* <SearchInput /> */}
          <div
            className={`${style.search} ${
              searchInputIsDisabled ? style.disabled : ""
            }`}
          >
            <InputSearchWithRelease
              setDeseaseData={setDeseaseData}
              releaseGroup={params.releaseGroup}
              releaseId={params.releaseId}
              releaseLang={params.releaseLang}
            />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Значение ВОЗ</th>
              <th>Новое значение</th>
              <th>Основание изменения</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <RecordProp
              title={"Заголовок"}
              defaultValue={
                (deseaseDataEntity?.title &&
                  deseaseDataEntity?.title["@value"]) ||
                ""
              }
              newValue={newTitle}
              newValueHandler={setNewTitle}
              newValueReason={newTitleReason}
              newValueReasonHandler={setNewTitleReason}
              placeholder={"Обязательно для заполнения"}
            />
            <RecordProp
              title={"Описание"}
              defaultValue={
                (deseaseDataEntity?.definition &&
                  deseaseDataEntity?.definition["@value"]) ||
                ""
              }
              newValue={newDefinition}
              newValueHandler={setNewDefinition}
              newValueReason={newDefinitionReason}
              newValueReasonHandler={setNewDefinitionReason}
              placeholder={"Обязательно для заполнения"}
            />
            <RecordProp
              title={"Диагностические требования"}
              defaultValue={
                (deseaseDataEntity?.longDefinition &&
                  deseaseDataEntity?.longDefinition["@value"]) ||
                ""
              }
              newValue={newLongDefinition}
              newValueHandler={setNewLongDefinition}
              newValueReason={newLongDefinitionReason}
              newValueReasonHandler={setNewLongDefinitionReason}
              placeholder={"Обязательно для заполнения"}
            />
            <RecordProp
              title={"Примечание к кодированию"}
              defaultValue={
                (deseaseDataEntity?.codingNote &&
                  deseaseDataEntity?.codingNote["@value"]) ||
                ""
              }
              newValue={newCodingNote}
              newValueHandler={setNewCodingNote}
              newValueReason={newCodingNoteReason}
              newValueReasonHandler={setNewCodingNoteReason}
              placeholder={"Обязательно для заполнения"}
            />
            <RecordProp
              title={"Полностью уточненное наименование"}
              defaultValue={
                (deseaseDataEntity?.fullySpecifiedName &&
                  deseaseDataEntity?.fullySpecifiedName["@value"]) ||
                ""
              }
              newValue={newFullySpecifiedName}
              newValueHandler={setNewFullySpecifiedName}
              newValueReason={newFullySpecifiedNameReason}
              newValueReasonHandler={setNewFullySpecifiedNameReason}
              placeholder={"Обязательно для заполнения"}
            />

            {/* <td>Включенные термины</td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td> */}
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
            <RecordPropMultiple
              title="Синонимы"
              arrayItems={synonym}
              activeItem={selectedSynonym}
              setActiveItem={setSelectedSynonym}
              placeholder={"Обязательно для заполнения"}
              clickIconHandler={() => {
                setIsModal(true);
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
            <RecordPropMultiple
              title="Включения"
              arrayItems={inclusion}
              activeItem={selectedInclusion}
              setActiveItem={setSelectedInclusion}
              placeholder={"Обязательно для заполнения"}
              clickIconHandler={() => {
                setIsModal(true);
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
            <RecordPropMultiple
              title="Исключения"
              arrayItems={exclusion}
              activeItem={selectedExclusion}
              setActiveItem={setSelectedExclusion}
              placeholder={"Обязательно для заполнения"}
              clickIconHandler={() => {
                setIsModal(true);
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
          </tbody>
        </table>
        {/* <div className={styles.headerBottom}>
          <div className={styles.subtitle}>Удаленные записи</div>
        </div>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>№</th>
              <th colSpan={2}>Код и наименование записи</th>
              <th></th>
              <th colSpan={2}>Дата и время изменения </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td colSpan={2}>
                2А00 Первичные новообразования головного мозга
              </td>
              <td></td>
              <td colSpan={2}>13.09.2023 23:12</td>
              <td></td>
            </tr>
          </tbody>
          </table> */}
        <div className="h-12"></div>
        <div className="flex justify-end">
          <SecondButton
            buttonLabel={"Назад"}
            buttonCheckImg={false}
            buttonHandler={() => navigate(-1)}
          />
          <div className="w-4"></div>
          <MainButton
            buttonLabel={"Сохранить"}
            buttonHandler={() => changeRecordHandler()}
            isLoading={isChangeLoading}
            isDisabled={isChangeLoading || !formIsValid}
          />
        </div>
      </div>
      <ModalWindowConfigurable
        setModal={setIsModal}
        isModal={isModal}
        config={modalConfig}
      />
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
      {/* <ModalWindowConfigurable
        setModal={setIsModalRedirect}
        isModal={isModalRedirect}
        config={{
          title: "Внимание!",
          body:
            "Данная запись уже была отредактирована. Хотите продолжить редактирование?",
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
