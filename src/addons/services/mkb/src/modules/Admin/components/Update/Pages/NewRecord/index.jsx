import { useEffect, useState, useContext } from "react";
import styles from "./index.module.scss";
import style from "./index.module.css";

import { BackBtn } from "./components/BackBtn";

import {
  MainButton,
  SecondButton,
} from "../../../../../../components/Button/Button";
import { ModalWindowConfigurable } from "../../../../../../components/modalConfigurable";
import InputSearchWithRelease from "./components/InputSearchWithRelease";
import { TextareaWithClear } from "@src/components/TextareaWithClear";
import { Dropdown } from "./components/Dropdown";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import deleteImg from "./assets/delete.svg";
import infoImg from "./assets/info.svg";
import addMultiple from "./assets/addMultiple.svg";
import { UserContext } from "@src/App";
import { ClipboardCopy } from "../../components/ClipboardCopy";

// 1 title (Заголовок)
// 2 inclusion (Включения)
// 3 definition (Описание)
// 4 exclusion (Исключения)
// 5 codingNote (Примечание к кодированию)
// 6 longDefinition (Диагностические требования)
// 7 indexTerm (Совпадающие термины)
// 8 synonym (Синонимы)
// 9 fullySpecifiedName (Полностью уточненное наименование)

const RecordPropMultipleLine = ({
  title,
  arrayItems = [],
  activeItem,
  mapSelectedItems = [],
  setMapSelectedItems,
  setMapDeletedItems,
  placeholder,
  clickIconHandler,
  isDisabled = false,
  isDeleted = false,
}) => {
  const [dropdownItems, setDropdownItems] = useState([]);
  useEffect(() => {
    if (activeItem && arrayItems.length && mapSelectedItems?.size) {
      const freeItems = arrayItems.filter(
        (item) => !mapSelectedItems.has(item.whoValue)
      );
      setDropdownItems(freeItems);
    }
  }, [activeItem, arrayItems, mapSelectedItems]);

  const changeSelectedItem = (selectedItem) => {
    setMapSelectedItems((prev) => {
      const copiedMap = new Map([...prev]);
      const deleteOperation = copiedMap.delete(activeItem.whoValue);
      // const setOperation = copiedMap.set(selectedItem.whoValue, selectedItem);
      if (deleteOperation) {
        return copiedMap.set(selectedItem.whoValue, selectedItem);
      }
    });
  };
  const newValueIsInvalid = !!(
    !activeItem.newValue.length && activeItem.basisOfChange.length
  );
  const newValueReasonIsInvalid = !!(
    activeItem.newValue.length && !activeItem.basisOfChange.length
  );
  return (
    <>
      <tr className={(isDeleted && "opacity-50 bg-[#ccc] relative z-10") || ""}>
        <td> {title}</td>
        <td>
          <Dropdown
            list={dropdownItems}
            selectedItem={activeItem}
            setSelectedItem={changeSelectedItem}
            isDisabled={isDisabled || isDeleted}
          />
        </td>
        <td className={(isDeleted && "pointer-events-none") || ""}>
          <TextareaWithClear
            // value={mapSelectedItems.get(activeItem?.whoValue).newValue}
            value={activeItem?.newValue}
            onChangeHandler={(e) => {
              const obj = mapSelectedItems.get(activeItem?.whoValue);
              obj.newValue = e;
              setMapSelectedItems((prev) => {
                const copiedMap = new Map([...prev]);
                return copiedMap.set(activeItem.whoValue, obj);
              });
            }}
            cn={newValueIsInvalid ? "!border !border-[#C61C1C]" : ""}
          />
          {newValueIsInvalid && (
            <div className="text-[#C61C1C]">Не может быть пустым</div>
          )}
        </td>
        <td className={(isDeleted && "pointer-events-none") || ""}>
          <TextareaWithClear
            placeholder={placeholder}
            value={activeItem?.basisOfChange}
            onChangeHandler={(e) => {
              const obj = mapSelectedItems.get(activeItem?.whoValue);
              obj.basisOfChange = e;
              setMapSelectedItems((prev) => {
                const copiedMap = new Map([...prev]);
                return copiedMap.set(activeItem.whoValue, obj);
              });
            }}
            cn={newValueReasonIsInvalid ? "!border !border-[#C61C1C]" : ""}
          />
          {newValueReasonIsInvalid && (
            <div className="text-[#C61C1C]">Не может быть пустым</div>
          )}
        </td>
        <td className="align-middle text-center">
          {mapSelectedItems.size > 1 && (
            <button
              onClick={() =>
                // !activeItem?.deleted && arrayItems.length && clickIconHandler()
                !isDeleted && clickIconHandler()
              }
            >
              <img src={deleteImg} className="m-0" alt="" />
            </button>
          )}
        </td>
      </tr>
      {isDeleted && (
        <tr>
          <td></td>
          <td colSpan={4} className="!px-5 !py-1">
            {" "}
            <div
              className="text-[#FDA52C] flex cursor-pointer w-fit"
              onClick={() => {
                setMapDeletedItems((prev) => {
                  const copiedMap = new Map([...prev]);
                  const deleteOperation = copiedMap.delete(activeItem.whoValue);
                  if (deleteOperation) return copiedMap;
                });
              }}
            >
              <img src={infoImg} className="m-0 mr-4 p-0" alt="" /> Вернуть
              удаленное значение
            </div>
          </td>
        </tr>
      )}
      {!isDeleted && (
        <tr>
          <td></td>
          <td colSpan={4} className="!px-5 !py-1">
            {" "}
            <div
              className="text-[#C61C1C] flex cursor-pointer w-fit"
              onClick={() => {
                setMapDeletedItems((prev) => {
                  const copiedMap = new Map([...prev]);
                  return copiedMap.set(activeItem.whoValue, activeItem);
                });
              }}
            >
              <img src={deleteImg} className="m-0 mr-4 p-0" alt="" /> Удалить
              значение
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const RecordPropMultiple = ({
  title,
  arrayItems,
  mapSelectedItems,
  mapDeletedItems,
  setMapSelectedItems,
  setMapDeletedItems,
}) => {
  // const newValueIsInvalid = !!(
  //   !activeItem.newValue.length && activeItem.basisOfChange.length
  // );
  // const newValueReasonIsInvalid = !!(
  //   activeItem.newValue.length && !activeItem.basisOfChange.length
  // );
  // const isDisabled =
  //   (activeItem.newValue.length && !activeItem.basisOfChange.length) ||
  //   (!activeItem.newValue.length && activeItem.basisOfChange.length);
  const [activeItems, setActiveItems] = useState([]);
  useEffect(() => {
    console.log(mapSelectedItems);
    if (mapSelectedItems?.size) {
      setActiveItems([...mapSelectedItems?.values()]);
    }
  }, [mapSelectedItems]);

  const findFirstNotBusy = () => {
    try {
      for (let index = 0; index < arrayItems?.length; index++) {
        const element = arrayItems[index];
        if (!mapSelectedItems.has(element?.whoValue)) return element;
      }
      return undefined;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {activeItems.map((item, idx) => (
        <RecordPropMultipleLine
          key={item.whoValue}
          mapSelectedItems={mapSelectedItems}
          setMapSelectedItems={setMapSelectedItems}
          setMapDeletedItems={setMapDeletedItems}
          clickIconHandler={() => {
            setMapSelectedItems((prev) => {
              item.newValue = "";
              item.basisOfChange = "";
              const copiedMap = new Map([...prev]);
              const operation = copiedMap.delete(item.whoValue);
              if (operation) {
                return copiedMap;
              }
            });
          }}
          isDisabled={idx < activeItems.length - 1}
          isDeleted={mapDeletedItems.has(item.whoValue)}
          arrayItems={arrayItems}
          activeItem={item}
          title={!idx ? title : ""}
        />
      ))}

      <tr>
        <td></td>
        <td colSpan={4} className="!px-5 !py-1">
          {!(arrayItems?.length === mapSelectedItems?.size) && (
            <div
              className="text-[#3256B0] flex cursor-pointer w-fit"
              onClick={() => {
                const elemToAdd = findFirstNotBusy();
                if (elemToAdd)
                  setMapSelectedItems((prev) => {
                    console.log(prev);
                    const copiedMap = new Map([...prev]);
                    return copiedMap.set(elemToAdd.whoValue, elemToAdd);
                  });
              }}
            >
              <img
                src={addMultiple}
                onClick={() => {}}
                className="m-0 mr-4 p-0"
                alt=""
              />{" "}
              Добавить строку
            </div>
          )}
        </td>
      </tr>
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
  const newValueIsInvalid = !!(!newValue.length && newValueReason.length);
  const newValueReasonIsInvalid = !!(newValue.length && !newValueReason.length);
  return (
    <tr>
      <td>{title}</td>
      <td className="relative">
        <textarea type="text" value={defaultValue} disabled={true} />
        <ClipboardCopy cn="absolute right-1 top-2" copyText={defaultValue} />
      </td>
      <td>
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
    busy: false,
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

export const NewRecord = () => {
  const { axiosInstance } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();

  const [formIsValid, setFormIsValid] = useState(false);

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
  const [selectedSynonymList, setSelectedSynonymList] = useState(new Map());
  const [deletedSynonymList, setDeletedSynonymList] = useState(new Map());
  const [selectedSynonym, setSelectedSynonym] = useState({});
  const [synonymIsValid, setSynonymIsValid] = useState(false);

  const [indexTerm, setIndexTerm] = useState([]);
  const [selectedIndexTerm, setSelectedIndexTerm] = useState({});
  const [selectedIndexTermList, setSelectedIndexTermList] = useState(new Map());
  const [deletedIndexTermList, setDeletedIndexTermList] = useState(new Map());
  const [indexTermIsValid, setIndexTermIsValid] = useState(false);

  const [inclusion, setInclusion] = useState([]);
  const [selectedInclusionList, setSelectedInclusionList] = useState(new Map());
  const [deletedInclusionList, setDeletedInclusionList] = useState(new Map());
  const [selectedInclusion, setSelectedInclusion] = useState({});
  const [inclusionIsValid, setInclusionIsValid] = useState(false);

  const [exclusion, setExclusion] = useState([]);
  const [selectedExclusionList, setSelectedExclusionList] = useState(new Map());
  const [deletedExclusionList, setDeletedExclusionList] = useState(new Map());
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

  useEffect(() => {
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

  const api = axios.create({
    // baseURL: process.env.REACT_APP_DEV_URL,
    baseURL: "https://mkb11-compose-dev.digitalms.ru/",
  });

  useEffect(() => {
    return () => {
      localStorage.removeItem("releaseId");
      localStorage.removeItem("releaseLang");
    };
  }, []);

  // const resetDeseaseData = async () => {
  //   await setDeseaseData(null);
  //   await setDeseaseDataEntity(null);
  //   await setNewTitle("");
  //   await setNewTitleReason("");
  //   await setNewDefinition("");
  //   await setNewDefinitionReason("");
  //   await setNewLongDefinition("");
  //   await setNewLongDefinitionReason("");
  //   await setNewCodingNote("");
  //   await setNewCodingNoteReason("");
  //   await setNewFullySpecifiedName("");
  //   await setNewFullySpecifiedNameReason("");
  //   await setSynonym([]);
  //   await setIndexTerm([]);
  //   await setInclusion([]);
  //   await setExclusion([]);
  // };

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
        if (deletedIndexTermList.has(whoValue)) {
          const selectedForDelete = deletedIndexTermList.get(whoValue);
          attributeChanges.push({
            attributeType: 7,
            attributeEditType: 2,
            whoValue: selectedForDelete.whoValue,
            newValue: selectedForDelete.newValue,
            basisOfChange: selectedForDelete.basisOfChange,
          });
          return;
        }

        const selectedForChange =
          selectedIndexTermList.has(whoValue) &&
          selectedIndexTermList.get(whoValue);

        if (selectedForChange)
          selectedForChange?.whoValue &&
            selectedForChange?.newValue &&
            selectedForChange?.basisOfChange &&
            attributeChanges.push({
              attributeType: 7,
              attributeEditType: 1,
              whoValue: selectedForChange.whoValue,
              newValue: selectedForChange.newValue,
              basisOfChange: selectedForChange.basisOfChange,
            });
      });
    synonym?.length &&
      synonym.forEach(({ whoValue, newValue, basisOfChange, deleted }) => {
        if (deletedSynonymList.has(whoValue)) {
          const selectedForDelete = deletedIndexTermList.get(whoValue);

          attributeChanges.push({
            attributeType: 8,
            attributeEditType: 2,
            whoValue: selectedForDelete.whoValue,
            newValue: selectedForDelete.newValue,
            basisOfChange: selectedForDelete.basisOfChange,
          });
          return;
        }

        const selectedForChange =
          selectedSynonymList.has(whoValue) &&
          selectedSynonymList.get(whoValue);

        if (selectedForChange)
          selectedForChange?.whoValue &&
            selectedForChange?.newValue &&
            selectedForChange?.basisOfChange &&
            attributeChanges.push({
              attributeType: 8,
              attributeEditType: 1,
              whoValue: selectedForChange.whoValue,
              newValue: selectedForChange.newValue,
              basisOfChange: selectedForChange.basisOfChange,
            });
      });

    inclusion?.length &&
      inclusion.forEach(({ whoValue, newValue, basisOfChange, deleted }) => {
        if (deletedInclusionList.has(whoValue)) {
          const selectedForDelete = deletedIndexTermList.get(whoValue);

          attributeChanges.push({
            attributeType: 2,
            attributeEditType: 2,
            whoValue: selectedForDelete.whoValue,
            newValue: selectedForDelete.newValue,
            basisOfChange: selectedForDelete.basisOfChange,
          });
          return;
        }

        const selectedForChange =
          selectedInclusionList.has(whoValue) &&
          selectedInclusionList.get(whoValue);

        if (selectedForChange)
          selectedForChange?.whoValue &&
            selectedForChange?.newValue &&
            selectedForChange?.basisOfChange &&
            attributeChanges.push({
              attributeType: 2,
              attributeEditType: 1,
              whoValue: selectedForChange.whoValue,
              newValue: selectedForChange.newValue,
              basisOfChange: selectedForChange.basisOfChange,
            });
      });

    exclusion?.length &&
      exclusion.forEach(({ whoValue, newValue, basisOfChange, deleted }) => {
        if (deletedExclusionList.has(whoValue)) {
          const selectedForDelete = deletedIndexTermList.get(whoValue);

          attributeChanges.push({
            attributeType: 4,
            attributeEditType: 2,
            whoValue,
            newValue,
            basisOfChange,
          });
          return;
        }

        const selectedForChange =
          selectedExclusionList.has(whoValue) &&
          selectedExclusionList.get(whoValue);

        if (selectedForChange)
          whoValue &&
            newValue &&
            basisOfChange &&
            attributeChanges.push({
              attributeType: 4,
              attributeEditType: 1,
              whoValue: selectedForChange.whoValue,
              newValue: selectedForChange.newValue,
              basisOfChange: selectedForChange.basisOfChange,
            });
      });

    // attributeChanges.forEach((item) => {
    //   item.id = getIdFromArr(changesForEdit, item.attributeType, item.whoValue);
    // });
    setIsChangeLoading(true);
    // return;
    // console.log(deseaseData.entityId);
    // console.log(deseaseData.id);

    axiosInstance
      .post(
        `/v1/release/${params.releaseId}/lang/${params.releaseLang}/changes`,
        {
          entityId: Number(deseaseData.entityId),
          residual: "",
          editType: 1,
          status: 1,
          code: deseaseData?.entity?.code,
          attributeChanges,
        }
      )
      .then(({ data }) => {
        // if (data.status === 200) {
        navigate(
          `/admin/edited-records-list/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}`
        );
        // setIsModal(true);
        // setModalConfig({
        //   title: "Успешная операция!",
        //   body: `Данная запись была успешно сохранена. Вы будете перенаправлены на список записей релиза ${params.releaseId}`,
        //   okBtn: {
        //     label: "Перейти",
        //     handler: () => {
        //       setIsModal(false);
        //       navigate(
        //         `/admin/edited-records-list/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}`
        //       );
        //     },
        //   },
        // });
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
    if (!deseaseData) return;
    console.log(deseaseData);
    // resetDeseaseData()
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
        const recordAlreadyEdited = changes.filter(
          (item) => item.code === deseaseData?.entity?.code
        )[0];

        // console.log(recordAlreadyEdited);
        if (recordAlreadyEdited) {
          setIsModal(true);
          setModalConfig({
            title: "Внимание!",
            body: `Данная запись была отредактирована. Вы хотите продолжить редактирование?`,
            okBtn: {
              label: "Перейти",
              handler: () => {
                navigate(
                  `/admin/edited-records-list/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}/edit-record/${recordAlreadyEdited.entityId}/${recordAlreadyEdited.id}/`
                );
              },
            },
            cancelBtn: {
              label: "Отменить",
              handler: () => setDeseaseData(null),
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
    console.log(indexTerm);
    if (indexTerm.length && !selectedIndexTermList.size) {
      const defaultIT = indexTerm[0];
      setSelectedIndexTermList((prev) => {
        // console.log(prev);
        const copiedMap = new Map([...prev]);
        return copiedMap.set(defaultIT.whoValue, defaultIT);
      });
    }
  }, [indexTerm]);

  useEffect(() => {
    // console.log(indexTerm);
    if (synonym.length && !selectedSynonymList.size) {
      const defaultIT = synonym[0];
      setSelectedSynonymList((prev) => {
        console.log(prev);
        const copiedMap = new Map([...prev]);
        return copiedMap.set(defaultIT.whoValue, defaultIT);
      });
    }
  }, [synonym]);

  useEffect(() => {
    // console.log(indexTerm);
    if (inclusion.length && !selectedInclusionList.size) {
      const defaultIT = inclusion[0];
      setSelectedInclusionList((prev) => {
        console.log(prev);
        const copiedMap = new Map([...prev]);
        return copiedMap.set(defaultIT.whoValue, defaultIT);
      });
    }
  }, [inclusion]);

  useEffect(() => {
    // console.log(indexTerm);
    if (exclusion.length && !selectedExclusionList.size) {
      const defaultIT = exclusion[0];
      setSelectedExclusionList((prev) => {
        console.log(prev);
        const copiedMap = new Map([...prev]);
        return copiedMap.set(defaultIT.whoValue, defaultIT);
      });
    }
  }, [exclusion]);

  useEffect(() => {
    if (deseaseDataEntity?.indexTerm?.length) {
      // console.log(deseaseData);
      // console.log(deseaseDataEntity);
      const indexTerm = processRawData(
        deseaseDataEntity?.indexTerm || deseaseData?.indexTerm
      );
      setIndexTerm(indexTerm);
      // setSelectedIndexTerm(indexTerm[0]);
    } else {
      setIndexTerm([]);
      // setSelectedIndexTerm({});
      // setSelectedIndexTermList([]);
    }
    if (deseaseDataEntity?.inclusion?.length) {
      const inclusion = processRawData(deseaseDataEntity?.inclusion);
      setInclusion(inclusion);
      // setSelectedInclusion(inclusion[0]);
    } else {
      setInclusion([]);
      // setSelectedInclusion({});
    }
    if (deseaseDataEntity?.exclusion?.length) {
      const exclusion = processRawData(deseaseDataEntity?.exclusion);
      setExclusion(exclusion);
      // setSelectedExclusion(exclusion[0]);
    } else {
      setExclusion([]);
      // setSelectedExclusion({});
    }
  }, [deseaseDataEntity]);

  // useEffect(() => {
  //   console.log(selectedIndexTermList);
  // }, [selectedIndexTermList]);

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
            `/admin/edited-records-list/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}`
          )
        }
      />
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>Создание новой записи</h2>
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
              {deseaseDataEntity?.title && deseaseDataEntity?.title["@value"] && (
                <RecordProp
                  title={"Заголовок"}
                  defaultValue={deseaseDataEntity?.title["@value"]}
                  newValue={newTitle}
                  newValueHandler={setNewTitle}
                  newValueReason={newTitleReason}
                  newValueReasonHandler={setNewTitleReason}
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
                  title="Термин в алфавитном указателе"
                  arrayItems={indexTerm}
                  mapSelectedItems={selectedIndexTermList}
                  mapDeletedItems={deletedIndexTermList}
                  setMapSelectedItems={setSelectedIndexTermList}
                  setMapDeletedItems={setDeletedIndexTermList}
                  // setArrayItems={setIndexTerm}
                  placeholder={"Обязательно для заполнения"}
                  // clickIconHandler={() => {
                  //   setIsModal(true);
                  //   setModalConfig({
                  //     title: "Внимание!",
                  //     body: `Данная строка будет удалена из списка включенных терминов.`,
                  //     okBtn: {
                  //       label: "Удалить",
                  //       handler: () => {
                  //         setSelectedIndexTerm((prev) => ({
                  //           ...prev,
                  //           newValue: "",
                  //           basisOfChange: "",
                  //           deleted: true,
                  //         }));
                  //         setIsModal(false);
                  //       },
                  //     },
                  //     cancelBtn: {
                  //       label: "Отменить",
                  //     },
                  //   });
                  // }}
                />
              )}
              {!!synonym.length && (
                <RecordPropMultiple
                  title="Синонимы"
                  arrayItems={synonym}
                  mapSelectedItems={selectedSynonymList}
                  mapDeletedItems={deletedSynonymList}
                  setMapSelectedItems={setSelectedSynonymList}
                  setMapDeletedItems={setDeletedSynonymList}
                  // activeItem={selectedSynonym}
                  // setActiveItem={setSelectedSynonym}
                  placeholder={"Обязательно для заполнения"}
                  // clickIconHandler={() => {
                  //   setIsModal(true);

                  //   setModalConfig({
                  //     title: "Внимание!",
                  //     body: `Данная строка будет удалена из списка синонимов.`,
                  //     okBtn: {
                  //       label: "Удалить",
                  //       handler: () => {
                  //         setSelectedSynonym((prev) => ({
                  //           ...prev,
                  //           newValue: "",
                  //           basisOfChange: "",
                  //           deleted: true,
                  //         }));
                  //         setIsModal(false);
                  //       },
                  //     },
                  //     cancelBtn: {
                  //       label: "Отменить",
                  //     },
                  //   });
                  // }}
                />
              )}
              {!!inclusion.length && (
                <RecordPropMultiple
                  title="Включения"
                  arrayItems={inclusion}
                  mapSelectedItems={selectedInclusionList}
                  mapDeletedItems={deletedInclusionList}
                  setMapSelectedItems={setSelectedInclusionList}
                  setMapDeletedItems={setDeletedInclusionList}
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
                            newValue: "",
                            basisOfChange: "",
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
                  mapSelectedItems={selectedExclusionList}
                  mapDeletedItems={deletedExclusionList}
                  setMapSelectedItems={setSelectedExclusionList}
                  setMapDeletedItems={setDeletedExclusionList}
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
                            newValue: "",
                            basisOfChange: "",
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
              buttonLabel={"Добавить"}
              buttonHandler={() => changeRecordHandler()}
              isLoading={isChangeLoading}
              // isDisabled={isChangeLoading || !formIsValid}
              // isDisabled={isChangeLoading || !formIsValid}
              isDisabled={false}
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
