import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Update } from "./Update";
import { Forbidden } from "./Forbidden";
import { UserContext } from "@src/App";
import { ProtectedRoute } from "@src/components/ProtectedRoute";
import { ChangesReview } from "./Update/Pages/ChangesReview";
import { EditRecords } from "./Update/Pages/EditRecords";
import { NewRecord } from "./Update/Pages/NewRecord";
import { EditRecord } from "./Update/Pages/EditRecord";
import { DeleteRecord } from "./Update/Pages/DeleteRecord";
import { DeleteRecords } from "./Update/Pages/DeleteRecords";
import { EditRelease } from "./Update/Pages/EditRelease";
import { PreviewChangeRecords } from "./Update/Pages/PreviewChangeRecords";
import { PreviewChangeRecord } from "./Update/Pages/PreviewChangeRecord";

export const Components = (props) => {
  const { userInfo } = useContext(UserContext);
  const [isMkbAdmin, setIsMkbAdmin] = useState(false);
  useEffect(() => {
    if (userInfo?.realm_access?.roles?.includes("mkb_admin"))
      setIsMkbAdmin(true);
    else setIsMkbAdmin(false);
  }, [userInfo]);
  return (
    <Routes>
      <Route
        path={"/update"}
        element={
          <ProtectedRoute
            redirectComponent={<Forbidden />}
            isAllowed={isMkbAdmin}
          >
            <Update />
          </ProtectedRoute>
          // <Update />
        }
      ></Route>
      <Route
        path={"/edited-records-list/:releaseId/:releaseLang/:releaseGroup"}
        element={<EditRelease />}
      ></Route>
      <Route path={"/changes-review"} element={<ChangesReview />}></Route>
      <Route
        path={"/preview-changes-list/:releaseId/:releaseLang/:releaseGroup/"}
        element={<PreviewChangeRecords />}
      ></Route>
      <Route path={"/edit-records"} element={<EditRecords />}></Route>
      <Route
        path={
          "/edited-records-list/:releaseId/:releaseLang/:releaseGroup/new-record/"
        }
        element={<NewRecord />}
      ></Route>
      <Route
        path={
          "/edited-records-list/:releaseId/:releaseLang/:releaseGroup/edit-record/:entityId/:changeId/"
        }
        element={<EditRecord />}
      ></Route>
      <Route
        path={
          "/edited-records-list/:releaseId/:releaseLang/:releaseGroup/preview-change-record/:entityId/:changeId/"
        }
        element={<PreviewChangeRecord />}
      ></Route>
      <Route
        path={"/deleted-records-list/:releaseId/:releaseLang/:releaseGroup"}
        element={<DeleteRecords />}
      ></Route>
      <Route
        path={
          "/deleted-records-list/:releaseId/:releaseLang/:releaseGroup/delete-record/"
        }
        element={<DeleteRecord />}
      ></Route>
    </Routes>
  );
};

export default Components;
