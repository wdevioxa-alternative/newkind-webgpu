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
import addMultiple from "./assets/addMultiple.svg";

import { UserContext } from "@src/App";
import { apiSearchCode } from "@src/utilites/search/apiSearchCode";
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

// const RecordPropMultiple = ({
//   title,
//   arrayItems,
//   activeItem,
//   setActiveItem,
//   placeholder,
//   clickIconHandler,
// }) => {
//   const isDisabled =
//     (activeItem?.newValue?.length && !activeItem?.basisOfChange?.length) ||
//     (!activeItem?.newValue?.length && activeItem?.basisOfChange?.length);
//   return (
//     <>
//       <tr
//         className={
//           (activeItem.deleted && "opacity-50 bg-[#ccc] relative z-10") || ""
//         }
//       >
//         <td> {title}</td>
//         <td>
//           <Dropdown
//             list={arrayItems}
//             selectedItem={activeItem}
//             setSelectedItem={setActiveItem}
//             isDisabled={isDisabled}
//           />
//         </td>
//         <td className={(activeItem.deleted && "pointer-events-none") || ""}>
//           <TextareaWithClear
//             value={activeItem.newValue}
//             onChangeHandler={(e) => {
//               setActiveItem((prev) => ({
//                 ...prev,
//                 newValue: e,
//               }));
//             }}
//           />
//           {!!(
//             !activeItem?.newValue?.length && activeItem?.basisOfChange?.length
//           ) && <div className="text-[#C61C1C]">Не может быть пустым</div>}
//         </td>
//         <td className={(activeItem.deleted && "pointer-events-none") || ""}>
//           <TextareaWithClear
//             placeholder={placeholder}
//             value={activeItem.basisOfChange}
//             onChangeHandler={(e) => {
//               console.log(e);
//               setActiveItem((prev) => ({
//                 ...prev,
//                 basisOfChange: e,
//               }));
//               // console.log(activeItem);
//             }}
//           />
//           {!!(
//             activeItem?.newValue?.length && !activeItem?.basisOfChange?.length
//           ) && <div className="text-[#C61C1C]">Не может быть пустым</div>}
//         </td>
//         <td className="align-middle text-center">
//           <button
//             onClick={() =>
//               !activeItem.deleted && arrayItems.length && clickIconHandler()
//             }
//           >
//             <img src={deleteImg} className="m-0" alt="" />
//           </button>
//         </td>
//       </tr>
//       {activeItem.deleted && (
//         <tr>
//           <td></td>
//           <td colSpan={4}>
//             {" "}
//             <div
//               className="text-[#FDA52C] flex cursor-pointer w-fit"
//               onClick={() => {
//                 setActiveItem((prev) => ({
//                   ...prev,
//                   deleted: false,
//                 }));
//               }}
//             >
//               <img src={infoImg} className="m-0 mr-4 p-0" alt="" /> Вернуть
//               удаленное значение
//             </div>
//           </td>
//         </tr>
//       )}
//     </>
//   );
// };
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
              const copiedMap = new Map([...prev]);
              const operation = copiedMap.delete(item.whoValue);
              if (operation) {
                return copiedMap;
              }
            });
          }}
          // isDisabled={idx < activeItems.length - 1}
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
  return (
    <tr>
      <td>{title}</td>
      <td className="relative">
        <textarea
          type="text"
          // defaultValue={"2А00 Новообразования головного мозга"}
          value={defaultValue}
          disabled={true}
        />
        <ClipboardCopy cn="absolute right-1 top-2" copyText={defaultValue} />
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

export const EditRecord = () => {
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
  const [selectedSynonymList, setSelectedSynonymList] = useState(new Map());
  const [deletedSynonymList, setDeletedSynonymList] = useState(new Map());

  const [indexTerm, setIndexTerm] = useState([]);
  const [selectedIndexTerm, setSelectedIndexTerm] = useState({});
  const [indexTermIsValid, setIndexTermIsValid] = useState(false);
  const [selectedIndexTermList, setSelectedIndexTermList] = useState(new Map());
  const [deletedIndexTermList, setDeletedIndexTermList] = useState(new Map());

  const [inclusion, setInclusion] = useState([]);
  const [selectedInclusion, setSelectedInclusion] = useState({});
  const [inclusionIsValid, setInclusionIsValid] = useState(false);
  const [selectedInclusionList, setSelectedInclusionList] = useState(new Map());
  const [deletedInclusionList, setDeletedInclusionList] = useState(new Map());

  const [exclusion, setExclusion] = useState([]);
  const [selectedExclusion, setSelectedExclusion] = useState({});
  const [exclusionIsValid, setExclusionIsValid] = useState(false);
  const [selectedExclusionList, setSelectedExclusionList] = useState(new Map());
  const [deletedExclusionList, setDeletedExclusionList] = useState(new Map());

  const [forcePassedLabel, setForcePassedLabel] = useState("");

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

  const { axiosInstance } = useContext(UserContext);

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

  useEffect(() => {
    params.releaseId &&
      params.releaseLang &&
      axiosInstance
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
    // if (recordChanges[0]) {
    //   if (recordChanges[0]?.entityId) {
    //     api
    //       .get(
    //         `/v1/icd/entity/${recordChanges[0]?.entityId}?releaseId=${params.releaseId}`,
    //         {
    //           headers: {
    //             "Accept-Language": `${params.releaseLang}`,
    //           },
    //         }
    //       )
    //       .then(({ data }) => {
    //         console.log(data);
    //         if (data?.synonym?.length) {
    //           const synonym = processRawData(data?.synonym);
    //           setSynonym(synonym);
    //           setSelectedSynonym(synonym[0]);
    //         } else {
    //           setSynonym([]);
    //           setSelectedSynonym({});
    //         }
    //       })
    //       .catch(console.log);
    //   }
    // }

    setChangesForEdit(attributeChanges);

    recordChanges[0]?.code &&
      apiSearchCode(recordChanges[0]?.code)
        .then(async (deseaseData) => {
          if (deseaseData && deseaseData.length) {
            const dataEntity = (deseaseData[0] && deseaseData[0]?.entity) || {};
            console.log(dataEntity);
            try {
              const code = dataEntity.code || recordChanges[0]?.code;
              const title = dataEntity?.title && dataEntity?.title["@value"];
              setForcePassedLabel(`${code} - ${title}`);
              console.log(code, title);
            } catch (error) {
              console.log(error);
            }
            const id = dataEntity["@id"].split("/").reverse()[0];
            if (id) {
              const entityData = await axiosInstance
                .get(
                  `/testing/v1/icd/entity/${id}?releaseId=${params.releaseId}`,
                  {
                    headers: {
                      "Accept-Language": `${params.releaseLang}`,
                    },
                  }
                )
                .catch(console.log);
              console.log(entityData);
              if (entityData.status === 200) {
                console.log(entityData);
                const { data } = entityData;
                // console.log(data);
                if (data?.synonym?.length) {
                  const synonym = processRawData(data?.synonym);
                  setSynonym(synonym);
                  // setSelectedSynonym(synonym[0]);
                } else {
                  setSynonym([]);
                  // setSelectedSynonym({});
                }
              }
            }
            precessMultipleData(dataEntity);
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
                const {
                  whoValue,
                  newValue,
                  basisOfChange,
                  attributeEditType,
                } = item;
                // setInclusion((prev) => {
                //   const newArr = [...prev];
                //   const newArrSplitted = newArr.map((item) => {
                //     console.log(
                //       whoValue,
                //       newValue,
                //       basisOfChange,
                //       attributeEditType
                //     );
                //     if (item.whoValue === newValue) {
                //       setSelectedInclusion({
                //         whoValue,
                //         newValue,
                //         basisOfChange,
                //         deleted: attributeEditType === 2 ? true : false,
                //       });
                //       return {
                //         whoValue,
                //         newValue,
                //         basisOfChange,
                //         deleted: attributeEditType === 2 ? true : false,
                //       };
                //     }
                //     return item;
                //   });
                //   // console.log(newArrSplitted);
                //   // newArr.push({
                //   //   whoValue,
                //   //   newValue,
                //   //   basisOfChange,
                //   //   deleted: attributeEditType === 2 ? true : false,
                //   // });

                //   return newArrSplitted;
                // });
              }
              if (item.attributeType === 4) {
                const {
                  whoValue,
                  newValue,
                  basisOfChange,
                  attributeEditType,
                } = item;
                setExclusion((prev) => {
                  const newArr = [...prev];
                  const newArrSplitted = newArr.map((item) => {
                    console.log(
                      whoValue,
                      newValue,
                      basisOfChange,
                      attributeEditType
                    );
                    if (item.whoValue === newValue) {
                      setSelectedExclusion({
                        whoValue,
                        newValue,
                        basisOfChange,
                        deleted: attributeEditType === 2 ? true : false,
                      });
                      return {
                        whoValue,
                        newValue,
                        basisOfChange,
                        deleted: attributeEditType === 2 ? true : false,
                      };
                    }
                    return item;
                  });
                  // console.log(newArrSplitted);
                  // newArr.push({
                  //   whoValue,
                  //   newValue,
                  //   basisOfChange,
                  //   deleted: attributeEditType === 2 ? true : false,
                  // });

                  return newArrSplitted;
                });
              }
              if (item.attributeType === 7) {
                const {
                  whoValue,
                  newValue,
                  basisOfChange,
                  attributeEditType,
                } = item;
                // setIndexTerm((prev) => {
                //   const newArr = [...prev];
                //   const newArrSplitted = newArr.map((item) => {
                //     console.log(
                //       whoValue,
                //       newValue,
                //       basisOfChange,
                //       attributeEditType
                //     );
                //     if (item.whoValue === newValue) {
                //       setSelectedIndexTerm({
                //         whoValue,
                //         newValue,
                //         basisOfChange,
                //         deleted: attributeEditType === 2 ? true : false,
                //       });
                //       return {
                //         whoValue,
                //         newValue,
                //         basisOfChange,
                //         deleted: attributeEditType === 2 ? true : false,
                //       };
                //     }
                //     return item;
                //   });
                //   // console.log(newArrSplitted);
                //   // newArr.push({
                //   //   whoValue,
                //   //   newValue,
                //   //   basisOfChange,
                //   //   deleted: attributeEditType === 2 ? true : false,
                //   // });

                //   return newArrSplitted;
                // });
                setSelectedIndexTermList((prev) => {
                  // console.log(prev);
                  const copiedMap = new Map([...prev]);
                  return copiedMap.set(whoValue, {
                    whoValue,
                    newValue,
                    basisOfChange,
                  });
                });
                // console.log(indexTerm);
                
                setIndexTerm(prev => {
                  const copied = [...prev];
                  const newCopied = copied.map(item => {
                    if(item.whoValue === newValue) return {
                      whoValue,
                      newValue,
                      basisOfChange
                    } 
                    else return item
                  })
                  return newCopied
                });
              }
              if (item.attributeType === 8) {
                const {
                  whoValue,
                  newValue,
                  basisOfChange,
                  attributeEditType,
                } = item;
                // setSynonym((prev) => {
                //   const newArr = [...prev];
                //   const newArrSplitted = newArr.map((item) => {
                //     console.log(
                //       whoValue,
                //       newValue,
                //       basisOfChange,
                //       attributeEditType
                //     );
                //     if (item.whoValue === newValue) {
                //       setSelectedSynonym({
                //         whoValue,
                //         newValue,
                //         basisOfChange,
                //         deleted: attributeEditType === 2 ? true : false,
                //       });
                //       return {
                //         whoValue,
                //         newValue,
                //         basisOfChange,
                //         deleted: attributeEditType === 2 ? true : false,
                //       };
                //     }
                //     return item;
                //   });
                //   // console.log(newArrSplitted);
                //   // newArr.push({
                //   //   whoValue,
                //   //   newValue,
                //   //   basisOfChange,
                //   //   deleted: attributeEditType === 2 ? true : false,
                //   // });

                //   return newArrSplitted;
                // });
                setSelectedSynonymList((prev) => {
                  console.log(prev);
                  const copiedMap = new Map([...prev]);
                  return copiedMap.set(whoValue, item);
                });
              }
            });
            setDeseaseDataEntity(dataEntity);
          }
        })
        .catch(console.log);

    // dataEntity.code = recordChanges[0]?.code;
  }, [changes]);

  useEffect(() => {
    // console.log(selectedIndexTermList);
    console.log(indexTerm);
  }, [indexTerm]);

  // const resetDeseaseData = async () => {
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

  const precessMultipleData = (deseaseDataEntity) => {
    // const tmpIndexTerm =
    if (deseaseDataEntity?.indexTerm?.length) {
      // console.log(deseaseData);
      // console.log(deseaseDataEntity);
      const indexTerm = processRawData(deseaseDataEntity?.indexTerm);
      setIndexTerm(indexTerm);
      // setSelectedIndexTerm(indexTerm[0]);
    } else {
      setIndexTerm([]);
      // setSelectedIndexTerm({});
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
    axiosInstance
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
        navigate(
          `/admin/edited-records-list/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}`
        );
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

  useEffect(() => {
    axiosInstance
      .get(`/v1/release/${params.releaseId}/lang/${params.releaseLang}/changes`)
      .then(({ data: { changes } }) => {
        const recordChanges = changes.filter(
          (item) => item.id === +params.changeId
        )[0];
        console.log(recordChanges);
      })
      .catch(console.log);
  }, [deseaseData]);

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
              forcePassedLabel={forcePassedLabel}
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
            {deseaseDataEntity?.title && deseaseDataEntity?.title["@value"] && (
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
            )}
            {deseaseDataEntity?.definition &&
              deseaseDataEntity?.definition["@value"] && (
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
              )}
            {deseaseDataEntity?.longDefinition &&
              deseaseDataEntity?.longDefinition["@value"] && (
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
              )}
            {deseaseDataEntity?.codingNote &&
              deseaseDataEntity?.codingNote["@value"] && (
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
              )}
            {deseaseDataEntity?.fullySpecifiedName &&
              deseaseDataEntity?.fullySpecifiedName["@value"] && (
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
              )}

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
