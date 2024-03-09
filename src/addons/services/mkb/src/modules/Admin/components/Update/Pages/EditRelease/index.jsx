import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { EditRecords } from "../EditRecords";
import { EditRecord } from "../EditRecord";

const api = axios.create({
  // baseURL: process.env.REACT_APP_DEV_URL,
  baseURL: "https://mkb11-compose-dev.digitalms.ru/",
});

export const EditRelease = () => {
  // const [changes, setChanges] = useState([]);
  // const params = useParams();
  // useEffect(() => {
  //   const { releaseId, releaseLang } = params;
  //   releaseId &&
  //     releaseLang &&
  //     api
  //       .get(`/v1/release/${releaseId}/lang/${releaseLang}/changes`)
  //       .then(({ data: { changes } }) => {
  //         // const {changes} = data
  //         console.log(changes);
  //         setChanges(changes.length ? changes : []);
  //       });
  // }, [params]);
  // useEffect(() => console.log(changes), [changes]);
  const [displayMode, setDisplayMode] = useState("editRecords");
  return displayMode === "editRecords" ? (
    <EditRecords  />
  ) : (
    <EditRecord />
  );
};
