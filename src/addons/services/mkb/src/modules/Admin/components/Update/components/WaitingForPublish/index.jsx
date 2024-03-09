import React, { useEffect, useState, useContext } from "react";
import style from "./index.module.css";
import { MainButton } from "@src/components/Button/Button";
import { idKey } from "@src/utilites/idKey";
import { ControlPanel } from "../ControlPanel";
import { useNavigate } from "react-router";
import { UserContext } from "@src/App";
import {ReactComponent as Info} from './assets/info.svg'
import { utcToLocal } from "../../../../../../utilites/datetime";

export const WaitingForPublish = ({
  reportList = [],
  moveForward,
  moveBack,
  remove,
}) => {
  const { axiosInstance } = useContext(UserContext);
  const changeHash = {};
  const [reportListD, setReportListD] = useState({});
  useEffect(() => {
    console.log(reportList);
    // const reportListPromises = Promise.allSettled(
    reportList.map((report) =>
      axiosInstance
        .get(`/v1/release/${report.releaseID}/lang/${report.lang}/changes`)
        .then((data) => {
          try {
            const dateArr = [];
            console.log(data?.data?.changes);
            if (data?.data?.changes?.length) {
              data?.data?.changes.forEach((change) => {
                if (change.status === "new" || change.status === "approved")
                  dateArr.push(
                    new Date(`${change?.changeCreationDate}`).getTime()
                  );
              });
              console.log(Math.max(...dateArr));
              if (dateArr.length)
                setReportListD((prev) => {
                  // prev[`${report.releaseID}-${report.lang}`] = Math.max(...dateArr)
                  // console.log(prev);
                  return {
                    ...prev,
                    [`${report.releaseID}-${report.lang}`]: Math.max(
                      ...dateArr
                    ),
                  };
                });
            }
          } catch (error) {
            console.log(error);
          }
        })
    );
   
  }, [reportList]);
  useEffect(() => console.log(reportListD), [reportListD]);
  // const getReleasesChanges = async (rl) => {
  //   return a
  // }
  const navigate = useNavigate();
  return (
    <>
      <h5 className={style.componentTitle}>Ожидает публикации</h5>
      <div className={style.container}>
        {reportList.length ? (
          reportList.map((report) => (
            <div className={style.item} key={idKey()}>
              <div className={style.titleStatusContainer}>
                <div className={style.title}>{report.title}</div>
                <div className={style.status}>
                  Дата загрузки{" "}
                  {/* {new Date(Number(`${report.releaseStateUnix}000`)).getDate()}. */}
                  {new Date(Number(`${report.releaseStateUnix}000`)).getDate() <
                  10
                    ? `0${new Date(
                        Number(`${report.releaseStateUnix}000`)
                      ).getDate()}`
                    : new Date(
                        Number(`${report.releaseStateUnix}000`)
                      ).getDate()}
                  .
                  {new Date(
                    Number(`${report.releaseStateUnix}000`)
                  ).getMonth() +
                    1 <
                  10
                    ? `0${
                        new Date(
                          Number(`${report.releaseStateUnix}000`)
                        ).getMonth() + 1
                      }`
                    : new Date(
                        Number(`${report.releaseStateUnix}000`)
                      ).getMonth() + 1}
                  .
                  {new Date(
                    Number(`${report.releaseStateUnix}000`)
                  ).getFullYear()}
                </div>
              </div>
              {/* <div className={style.status}>
                        Статус:<br/>
                        ожидает согласования<br/>
                        тестирование успешно<br/>
                    </div> */}
              <div className={style.actions}>
                <div className={style.actionsWrapper}>
                  <div
                    className={style.views}
                    onClick={() => {
                      window.open(
                        `${window.location.origin}/testing/?Lang=${report.lang}&Release=${report.releaseID}`,
                        "_blank"
                      );
                    }}
                  >
                    Просмотреть
                  </div>
                  {/* <div
                  className={style.approve}
                  onClick={() =>
                    move({
                      releaseID: report.releaseID,
                      releaseState: report.releaseState,
                      toState: report.releaseState + 1,
                      lang: report.lang,
                    })
                  }
                >
                  Согласовать
                </div> */}
                  <div
                    className={style.cancel}
                    onClick={() =>
                      moveBack({
                        releaseID: report.releaseID,
                        releaseState: report.releaseState,
                        toState: report.releaseState - 1,
                        lang: report.lang,
                        reason: "some real reason",
                      })
                    }
                  >
                    Вернуть на рассмотрение
                  </div>
                  {/* <div
                  className={style.delete}
                  onClick={() =>
                    remove({
                      releaseID: report.releaseID,
                      releaseState: report.releaseState,
                      lang: report.lang,
                    })
                  }
                >
                  Удалить
                </div> */}
                </div>
                <div className="w-full mb-5 flex items-center text-[#FDA52C]">
                  {reportListD[`${report.releaseID}-${report.lang}`] && <>
                    <Info className='mr-2' />{" "}В версию внесены изменения {utcToLocal(new Date(reportListD[`${report.releaseID}-${report.lang}`]))}   
                  </>}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <ControlPanel
                    changesLog={true}
                    changesReview={true}
                    changesCommit={true}
                    releaseID={report.releaseID}
                    lang={report.lang}
                    previewBtnClickHandler={() => {
                      navigate(
                        `/admin/preview-changes-list/${report.releaseID}/${report.lang}/testing`
                      );
                    }}
                    editBtnClickHandler={() => {
                      navigate(
                        `/admin/edited-records-list/${report.releaseID}/${report.lang}/testing`
                      );
                      window.localStorage.setItem(
                        "releaseId",
                        report.releaseID
                      );
                      window.localStorage.setItem("releaseLang", report.lang);
                      window.localStorage.setItem("releaseGroup", "testing");
                    }}
                    deleteBtnClickHandler={() => {
                      navigate(
                        `/admin/deleted-records-list/${report.releaseID}/${report.lang}/testing`
                      );
                      window.localStorage.setItem(
                        "releaseId",
                        report.releaseID
                      );
                      window.localStorage.setItem("releaseLang", report.lang);
                      window.localStorage.setItem("releaseGroup", "testing");
                    }}
                  />
                </div>
                <MainButton
                  buttonLabel={"Опубликовать"}
                  buttonHandler={() =>
                    moveForward({
                      releaseID: report.releaseID,
                      releaseState: report.releaseState,
                      toState: report.releaseState + 1,
                      lang: report.lang,
                      forceMove: true,
                    })
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <div className={style.emptyList}>Список пока пуст...</div>
        )}
      </div>
    </>
  );
};
