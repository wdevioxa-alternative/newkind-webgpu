import React, { useEffect, useState, useCallback, useContext } from "react";
import style from "./index.module.css";
import axios from "@src/utilites/API";
import { useLocalStorage } from "@src/hooks/useLocalStorage";
import { WaitingForPublish } from "./components/WaitingForPublish";
import { CanceledVersions } from "./components/CanceledVersions";
import { PublishedVersions } from "./components/PublishedVersions";
import { ReportList } from "./components/ReportList";
import { Raw } from "./components/Raw";
import { Modal } from "./components/Modal";
import { ModalConfirm } from "./components/ModalConfirm";
import { PopupMessage } from "./components/PopupMessage";
import { Notification } from "./components/Notification";
import { releaseStatuses } from "./config";
// import { getRefreshToken } from '../../../api';
import { UserContext } from "@src/App";
import { ModalWindowConfigurable } from "@src/components/modalConfigurable";

import { logOut } from "../../../../hooks/useAuth.js";
import { Outlet } from "react-router";
const Info = () => (
  <div
    style={{
      color: "var(--black-100per)",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "18px",
      marginBottom: "12px",
    }}
  >
    Опрос портала производится каждый вторник в 10:00 по московскому времени
  </div>
);

const Status = ({ updated }) => {
  return (
    updated && (
      <div
        style={{
          color: "var(--black-100per)",
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "18px",
          marginBottom: "12px",
        }}
      >
        Список обновлен {updated} в ручном режиме
      </div>
    )
  );
};

const reportChangesDictionary = {};

const adminApi = axios;

export const Update = () => {
  const [isICDLatest, setICDLatest] = useState(false);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState(null);
  const [showWarn, setShowWarn] = useState(false);
  const [moveReason, setMoveReason] = useState("");
  const [cachedConfig, setCachedConfig] = useState(null);
  const [cachedDeleteConfig, setCachedDeleteConfig] = useState(null);
  const [loadingRelease, setLoadingRelease] = useState(false);
  const [reportList, setReportList] = useState([]);
  const [alailable, setAlailable] = useState([]);
  const [raw, setRaw] = useState([]);
  const [testing, setTesting] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [applied, setApplied] = useState([]);
  const [loadingVersion, setLoadingVersion] = useState("");
  const [isModal, setIsModal] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    title: "Внимание!",
    body: `Перед публикацией необходимо зафиксировать изменения, внесенные в релиз`,
    okBtn: {
      label: "Закрыть",
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

  const { axiosInstance } = useContext(UserContext);

  useEffect(() => {
    setAlailable(
      reportList.filter(
        (report) => report.releaseState === releaseStatuses.AVAILABLE
      )
    );
    setRaw(
      reportList.filter((report) => report.releaseState === releaseStatuses.RAW)
    );
    setTesting(
      reportList.filter(
        (report) => report.releaseState === releaseStatuses.TESTING
      )
    );
    setApplied(
      reportList.filter(
        (report) => report.releaseState === releaseStatuses.APPLIED
      )
    );
    setCancelled(
      reportList.filter(
        (report) => report.releaseState === releaseStatuses.CANCELLED
      )
    );
    setLoadingRelease(
      reportList.some(
        (report) => report.releaseState === releaseStatuses.LOADING
      )
    );
  }, [reportList]);

  useEffect(() => console.log(reportList), [reportList]);

  useEffect(() => {
    if (loadingRelease === true) getProgressInfo();
  }, [loadingRelease]);

  useEffect(() => {
    if (cachedConfig !== null) {
      if (
        applied.length === releaseStatuses.RAW &&
        cachedConfig.toState === releaseStatuses.CANCELLED
      ) {
        setConfirmConfig({
          text:
            "При удалении единственной опубликованной версии просмотр справочника МКБ-11 будет невозможен. Вы уверены, что хотите продолжить?",
          type: "warning",
          onSubmit: () => {
            setShowConfirm(false);
            setShow(true);
          },
        });
      } else if (
        cachedConfig.toState === releaseStatuses.APPLIED &&
        cancelled.some(
          (release) =>
            release.releaseID === cachedConfig.releaseID &&
            release.lang === cachedConfig.lang
        )
      ) {
        setConfirmConfig({
          text: "Ранее отменённую версию опубликовать невозможно",
          type: "error",
          onSubmit: () => {},
        });
      } else {
        setShow(true);
      }
    }
  }, [cachedConfig]);

  useEffect(() => {
    if (cachedDeleteConfig !== null) {
      setConfirmConfig({
        text: "Вы действительно хотите удалить версию?",
        type: "warning",
        onSubmit: () => {
          setShowConfirm(false);
          removeRelease();
        },
      });
    }
  }, [cachedDeleteConfig]);

  useEffect(() => {
    if (confirmConfig !== null) setShowConfirm(true);
  }, [confirmConfig]);

  const resetModals = () => {
    setShow(false);
    setShowConfirm(false);
    setShowWarn(false);
  };

  const resetData = () => {
    setCachedConfig(null);
    setCachedDeleteConfig(null);
    setCachedDeleteConfig(null);
    setMoveReason("");
    resetModals();
  };

  const fetchVersionsFromVoz = useCallback(async (param = "") => {
    // const access = window.localStorage.getItem("accessToken");
    const loaderCheckRu = await axiosInstance
      ?.post(`/loader/check`, {
        lang: "ru",
      })
      .catch(console.log);

    const reportListEn = await axiosInstance
      ?.get(`/loader/list/en?rt=${param}`)
      .catch(console.log);
    const reportListRu = await axiosInstance
      ?.get(`/loader/list/ru?rt=${param}`)
      .catch(console.log);

    console.log(
      "================ reportListRu =================",
      reportListRu
    );
    setReportList(
      [...(reportListEn?.data ?? []), ...(reportListRu?.data ?? [])]
        .map((a) => {
          if (a.isICDLatest) {
            setICDLatest(true);
          }

          return {
            ...a,
            title: `${a.releaseID} ${
              a.lang == "en" ? "(англ. яз.)" : "(рус. яз.)"
            }`,
          };
        })
        .sort(
          (a, b) =>
            new Date(b.loadedAt).getTime() - new Date(a.loadedAt).getTime()
        )
    );
  }, []);

  const fetchAvailableVersions = useCallback(() => {
    try {
      axiosInstance
        .get(`/v1/icd/release/11/available`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((data) => {
          console.log("(((( available ))))", data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const checkVersionsFromVoz = useCallback(() => {
    try {
      // const access = window.localStorage.getItem("accessToken");
      axiosInstance
        ?.post("/loader/check", {
          lang: "en",
        })
        .then(() => {
          fetchVersionsFromVoz();
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const downloadRelease = useCallback((id, lang) => {
    try {
      // const access = window.localStorage.getItem("accessToken");
      axiosInstance
        ?.post(
          "/loader/grab",
          {
            releaseId: `${id}`,
            lang: `${lang}`,
            apiVer: "v1",
          }
          // {
          //   headers: {
          //     Authorization: `Bearer ${access}`,
          //   },
          // }
        )
        .then((data) => {
          setLoadingVersion(
            `${id} ${lang == "en" ? "(англ. яз.)" : "(рус. яз.)"}`
          );
          setLoadingRelease(true);
        })
        .catch(console.log);
    } catch (error) {
      if (error.response.status === 401) {
      } else {
        console.log(error);
      }
    }
  }, []);
  const getProgressInfo = useCallback(() => {
    try {
      // const access = window.localStorage.getItem("accessToken");
      const timeId = setTimeout(
        () =>
          axiosInstance?.get("/loader/grab/progress").then(({ data }) => {
            console.log(data);
            if (data.done !== true) {
              getProgressInfo();
            }
            if (data.done === true) {
              setLoadingRelease(false);
              fetchVersionsFromVoz();
              setLoadingVersion("");
            }
          }),
        8000
      );
    } catch (error) {
      if (error.response.status === 401) {
      } else {
        console.log(error);
      }
    }
  }, []);

  const moveReleaseStatus = useCallback(
    (config) => {
      try {
        // const access = window.localStorage.getItem("accessToken");
        axiosInstance
          ?.post("/loader/move", {
            reason: moveReason,
            ...(config || cachedConfig),
          })
          .then(() => {
            fetchVersionsFromVoz();
            setShow(false);
            resetData();
          })
          .catch((error) => {
            let err = undefined;
            console.log("@@@@", error.response.status);
            if (error.response.status === 400) {
              // err = "Данная версия уже существует.";
              // alert(err);
              if (
                error?.response?.data?.error?.includes(
                  "whole release changes must be approved"
                )
              ) {
                setIsModal(true);
                setModalConfig({
                  title: "Внимание!",
                  body: `Перед публикацией необходимо зафиксировать изменения, внесенные в релиз`,
                  okBtn: {
                    label: "Закрыть",
                    handler: () => {
                      console.log(111);
                      setIsModal(false);
                      resetData();
                      // navigate();
                      // `/admin/edit-release/${params.releaseId}/${params.releaseLang}/${params.releaseGroup}/edit-record/${item.entityId}/${item.id}/`
                    },
                  },
                });
              }
            }
          })
          .finally(() => {
            setShow(false);
            resetData();
          });
      } catch (error) {
        console.log(error);
      }
    },
    [moveReason, cachedConfig]
  );
  const removeRelease = useCallback(
    (config) => {
      try {
        // const access = window.localStorage.getItem("accessToken");
        axiosInstance
          ?.post("/loader/remove", {
            // lang: 'en',
            ...cachedDeleteConfig,
          })
          .then(() => {
            fetchVersionsFromVoz();
            setShowConfirm(false);
            resetData();
          })
          .catch((error) => {
            alert(error);
            resetData();
          })
          .finally(() => {
            setShowConfirm(false);
            resetData();
          });
      } catch (error) {
        console.log(error);
      }
    },
    [cachedDeleteConfig]
  );

  useEffect(() => {
    return () => {
      localStorage.removeItem("releaseId");
      localStorage.removeItem("releaseLang");
    };
  }, []);

  useEffect(() => {
    fetchVersionsFromVoz();
  }, []);

  const getAdditionalModal = useCallback(() => {
    setConfirmConfig({
      text:
        "Данная версия опубликована на Портале ФНСИ. Вы уверены, что хотите отменить действующую версию?",
      type: "warning",
      onSubmit: () => {
        moveReleaseStatus();
        setShowConfirm(false);
      },
    });
  }, [moveReason, cachedConfig]);

  // console.log('@@@@@@@@ cachedConfig @@@@@@@@', cachedConfig)
  // console.log('=========================', cachedConfig)

  return (
    <div className={style.container}>
      <main className={style.content}>
        <h3 className={style.pageTitle}>
          Список неопубликованных в РФ версий МКБ-11
        </h3>
        <PopupMessage
          text={""}
          show={showWarn}
          title={"Ошибка"}
          onClose={() => setShowWarn(false)}
        />
        {cachedConfig &&
          (cachedConfig?.releaseState === 3 ? (
            <Modal
              title="Введите основание для отмены версии"
              onClose={() => {
                setShow(false);
                resetData();
              }}
              show={show}
              onChange={setMoveReason}
              onSubmit={getAdditionalModal}
              // onSubmit={moveReleaseStatus}
              isDisabledMainBtn={!moveReason.length}
            />
          ) : (
            <Modal
              title="Введите основание для публикации"
              onClose={() => {
                setShow(false);
                resetData();
              }}
              show={show}
              onChange={setMoveReason}
              // onSubmit={getAdditionalModal}
              onSubmit={moveReleaseStatus}
              isDisabledMainBtn={!moveReason.length}
            />
          ))}
        <ModalConfirm
          title={confirmConfig?.title || "Внимание!"}
          text={confirmConfig?.text}
          onClose={() => {
            setShowConfirm(false);
            resetData();
          }}
          show={showConfirm}
          onSubmit={confirmConfig?.onSubmit}
          type={confirmConfig?.type}
        />

        <div className={style.asideMobile}>
          {isICDLatest && (
            <div className={style.banner}>
              <Notification className={style} />
            </div>
          )}
          <h3 className={style.titleMobile}>
            Список неопубликованных в РФ версий МКБ-11
          </h3>
          <div className={style.mobileInfoStatus}>
            <ReportList
              reportList={alailable}
              update={checkVersionsFromVoz}
              downloadRelease={downloadRelease}
            />
          </div>
        </div>
        <Raw
          reportList={raw}
          isLoading={loadingRelease}
          move={moveReleaseStatus}
          remove={setCachedDeleteConfig}
          titleLoadingVersion={loadingVersion}
        />
        <WaitingForPublish
          reportList={testing}
          moveForward={setCachedConfig}
          moveBack={moveReleaseStatus}
          remove={setCachedDeleteConfig}
        />
        <CanceledVersions
          reportList={cancelled}
          remove={setCachedDeleteConfig}
          showMoveReason={setConfirmConfig}
        />
        <PublishedVersions
          reportList={applied}
          move={setCachedConfig}
          showMoveReason={setConfirmConfig}
          api={axiosInstance}
          commitChangesCallback={fetchVersionsFromVoz}
        />
      </main>
      <aside className={style.aside}>
        <div className={style.wrapper}>
          {isICDLatest && (
            <div className={style.banner}>
              <Notification className={style} />
            </div>
          )}
          <ReportList
            reportList={alailable}
            update={checkVersionsFromVoz}
            downloadRelease={downloadRelease}
          />
        </div>
      </aside>
      <ModalWindowConfigurable
        setModal={setIsModal}
        isModal={isModal}
        config={modalConfig}
      />
    </div>
  );
};

export default Update;
