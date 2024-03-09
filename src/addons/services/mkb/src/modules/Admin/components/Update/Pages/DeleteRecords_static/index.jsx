import React from "react";
import { ReactComponent as Commited } from "./assets/commited.svg";
import { ReactComponent as Download } from "./assets/download.svg";
import styles from "./index.module.scss";
import { BackBtn } from "./components/BackBtn";
import { AddBtn } from "./components/AddBtn";
import { SecondButton } from "../../../../../../components/Button/Button";

export const DeleteRecords = () => {
  return (
    <div className={styles.ChangesReviewPage}>
      <BackBtn />
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h2 className={styles.title}>Записи, подлежащие удалению</h2>
          <div className={styles.commited}>
            <Commited />
            Изменения зафиксированы
            <br />
            16.10.2023 14:15
          </div>
        </div>
        <div className={styles.headerBottom}>
          <div className={styles.subtitle}>
            <AddBtn />
          </div>
          <div className={styles.download}>
            <Download />
            Выгрузить
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Код и наименование записи</th>
              <th>Измененные атрибуты</th>
              <th>Состояние атрибута</th>
              <th>Дата и время изменения </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2А00 Первичные новообразования головного мозга</td>
              <td>Заголовок </td>
              <td className={styles.stateDeleted}>Удален</td>
              <td>13.09.2023 23:12</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                1D02 Инфекционный миелит, не классифицированный в других
                рубриках
              </td>
              <td>Заголовок </td>
              <td className={styles.stateDeleted}>Удален</td>
              <td>13.09.2023 23:12</td>
            </tr>
            <tr>
              <td>3</td>
              <td>1F2D Недерматофитные поверхностные дерматомикозы</td>
              <td>Заголовок </td>
              <td className={styles.stateChanged}> Изменен</td>
              <td>13.09.2023 23:12</td>
            </tr>
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
        <SecondButton
          buttonLabel={"Зафиксировать изменения"}
          buttonHandler={() => console.log(111)}
        />
      </div>
    </div>
  );
};
