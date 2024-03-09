import React, { useState, useEffect, useContext } from "react";
import style from "./index.module.css";
import { idKey } from "@src/utilites/idKey";
import { utilites } from "../../utilites";
import { releaseStatuses } from "../../config";
import { ControlPanel } from "../ControlPanel";
import { api } from "../../../../../../utilites/Icd-11";
import { UserContext } from "@src/App";
import { useNavigate } from "react-router";
import { utcToLocal } from "../../../../../../utilites/datetime";
import {ReactComponent as Info} from './assets/info.svg'


export const PublishedVersions = ({
  reportList,
  move,
  showMoveReason,
  api,
  commitChangesCallback,
}) => {
  const [list, setList] = useState([]);

  const { axiosInstance } = useContext(UserContext);

  const navigate = useNavigate()

  useEffect(() => {
    const sortedReportList = utilites.filterForPublishedList(reportList);
    // const sortedReportList = reportList.sort((a, b) => new Date(b.releaseID).getTime() - new Date(a.releaseID).getTime());
    // let newSortedReportList = [];
    // for (let i = 0; i < sortedReportList.length; i++) {
    // 	if (i === sortedReportList.length - 1) {
    // 		newSortedReportList.push(sortedReportList[i]);
    // 		break;
    // 	}
    // 	if (sortedReportList[i].releaseID === sortedReportList[i + 1].releaseID) {
    // 		let first = sortedReportList[i];
    // 		sortedReportList[i] = sortedReportList[i + 1];
    // 		sortedReportList[i + 1] = first;
    // 		newSortedReportList.push(sortedReportList[i]);
    // 	} else {
    // 		newSortedReportList.push(sortedReportList[i]);
    // 	}
    // }
    setList(sortedReportList);
  }, [reportList]);

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
                if (change.status === "published")
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

  const download = async (releaseID, lang) => {
    // let releaseID = params.releaseId;
    // let lang = params.releaseLang;
    let state = "3";

    try {
      
      const response = await axiosInstance
        .get(
          `/v1/change/release/${releaseID}/lang/${lang}/state/${state}/export`,
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
    <>
      <h5 className={style.componentTitle}>
        Список опубликованных в РФ версий МКБ-11
      </h5>
      <div className={style.container}>
        {list.length ? (
          list.map((report, idx) => (
            // <div className={`${style.item} ${idx === 0 ? style.current : style.archive}`} key={idKey()}>
            <div className={`${style.item}`} key={idKey()}>
              <div className={style.titleStatusContainer}>
                <div className={style.title}>
                  {report.title}{" "}
                  {idx === 0 ? (
                    <span className={style.subtitleGreen}>
                      (опубликована на портале ФНСИ)
                    </span>
                  ) : (
                    <span className={style.subtitle}>(архивная версия)</span>
                  )}
                </div>
                <div className={style.status}>
                  Дата публикации{" "}
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
              <div className={style.actions}>
                {/* <div className={style.download}>Скачать контейнер</div> */}
                {/* <div className={style.report}>Отчет об изменениях</div> */}
                <div
                  className={style.reason}
                  onClick={() => {
                    showMoveReason({
                      title: "Основание публикации",
                      type: "info",
                      text: report.releaseStateReason,
                    });
                  }}
                >
                  Основание публикации
                </div>
                <div
                  className={style.cancel}
                  onClick={() =>
                    move({
                      releaseID: report.releaseID,
                      releaseState: report.releaseState,
                      toState: releaseStatuses.CANCELLED,
                      lang: report.lang,
                      firstBase: idx === 0 ? true : false,
                    })
                  }
                >
                  Отменить
                </div>
              </div>
              <div className="w-full mb-5 mt-3 flex items-center text-[#37C570] text-xs">
                  {reportListD[`${report.releaseID}-${report.lang}`] && <>
                    <Info className='mr-2' />{" "}В версию внесены изменения {utcToLocal(new Date(reportListD[`${report.releaseID}-${report.lang}`]))}   
                  </>}
                </div>
              {idx === 0 && (
                <div className="w-full my-4">
                  <ControlPanel
                    changesCommitType="single"
                    changesLog={false}
                    changesReview={true}
                    changesCommit={true}
                    // commitBtnClickHandler={() =>
                    // }
                    previewBtnClickHandler={() => {
                      // download(report.releaseID, report.lang)
                      navigate(`/admin/preview-changes-list/${report.releaseID}/${report.lang}/applied`)
                    }}
                    editBtnClickHandler={async () => {
                      try {
                        const { status } = await api.post(
                          `/v1/release/${report.releaseID}/lang/${report.lang}/copy`
                        );
                        if (status === 200) commitChangesCallback();
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={style.emptyList}>Список пока пуст...</div>
        )}
        {/* <div className={style.item}>
                    <div className={style.title}>2022-02 (архивная версия)</div>
                    <div className={style.actions}>
                        <div className={style.download}>Скачать контейнер</div>
                        <div className={style.report}>Отчет об изменениях</div>
                        <div className={style.reason}>Основание</div>
                        <div className={style.cancel}>Отменить</div>
                    </div>
                </div> */}
      </div>
    </>
  );
};
