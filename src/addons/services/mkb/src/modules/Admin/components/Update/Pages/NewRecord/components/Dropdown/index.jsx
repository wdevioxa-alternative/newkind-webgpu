import { useCallback, useEffect, useRef, useState } from "react";
// import { useOutsideClick } from "@src/hooks/useOutsideClick";
import { useOutsideClick } from "@src/hooks/useOutsideClick";
import "./index.scss";
import { ReactComponent as ArrowIcon } from "./assets/arrow.svg";
import { idKey } from "@src/utilites/idKey";

export const Dropdown = ({
  list,
  selectedItem,
  setSelectedItem,
  isDisabled,
  allowChange,
}) => {
  // console.log(list)

  // let oldList = useRef();
  // !oldList.current &&
  //   Array.isArray(list) &&
  //   (oldList.current = JSON.stringify(list));
  const dropdownRef = useRef();
  // console.log(dropdownRef);
  const [isActive, setIsActive] = useState(false);
  // const [selectedItem, setSelectedItem] = useState();

  const onClick = () => {
    setIsActive(!isActive);
  };

  const onWindowClick = useCallback((e) => {
    // console.log(initialState)
    // If the active element exists and is clicked outside of
    if (
      dropdownRef.current !== null &&
      dropdownRef?.current &&
      !dropdownRef?.current.contains(e.target)
    ) {
      setIsActive(false);
    }
  }, []);

  // const reset = async () => {
  //   await setSelectedItem(null);
  // };

  useEffect(() => {
    window.addEventListener("click", onWindowClick);
    return () => {
      window.removeEventListener("click", onWindowClick);
    };
  }, []);

  // useEffect(() => {
  // if(JSON.stringify(list) !== oldList) {
  //   reset().then(() => list?.length && setSelectedItem(list[0]))
  // }
  // !selectedItem && list?.length && setSelectedItem(list[0])
  // console.log(JSON.stringify(list))
  // console.log(oldList)
  // if (JSON.stringify(list) !== oldList.current)
  //   reset().then(() => {
  //     list?.length && setSelectedItem(list[0]);
  //   });
  //   oldList.current = JSON.stringify(list);
  // }, [list]);

  return (
    <div
      className={`dropdown__container bg-white !w-full h-[70px] ${
        isDisabled ? "disabled" : ""
      }`}
      ref={dropdownRef}
    >
      <div
        className="dropdown__btn !flex !justify-between !items-center max-w-[250px] !h-full"
        onClick={onClick}
      >
        <div className="flex-shrink-1 overflow-hidden text-ellipsis">
          {selectedItem?.whoValue}
        </div>
        {!isDisabled && <ArrowIcon />}
      </div>
      <div className={`dropdown__content ${isActive ? "active" : "inactive"}`}>
        <div className="dropdown__info">
          <ul>
            {list?.map((item) => (
              <li
                key={idKey()}
                className="!whitespace-break-spaces cursor-pointer"
                onClick={() => {
                  setSelectedItem(item);
                  // setActiveItem(item);
                }}
              >
                {item.whoValue}
              </li>
            ))}
            {/* <li>
              <NavLink to={"/admin/edit-records"} onClick={editBtnClickHandler}>
                Отредактировать записи
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/delete-records"}>Удалить записи</NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};
