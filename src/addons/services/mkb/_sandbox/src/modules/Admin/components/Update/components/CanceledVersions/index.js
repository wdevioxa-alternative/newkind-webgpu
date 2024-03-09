import React from 'react';
import style from './index.module.css';
import { idKey } from '@src/utilites/idKey';

export const CanceledVersions = ({ reportList, remove, showMoveReason }) => {
  return (
    <>
      <h5>Отмененные версии</h5>
      <div className={style.container}>
        {reportList.length ? reportList.map(report => (
					<div className={style.item} key={idKey()}>
						<div className={style.titleStatusContainer}>
							<div className={style.title}>{report.title}</div>
							<div className={style.status}>
								Дата отмены
								{' '}
								{/* {new Date(Number(`${report.releaseStateUnix}000`)).getDate()}. */}
								{new Date(Number(`${report.releaseStateUnix}000`)).getDate() + 1 < 10
									? `0${new Date(Number(`${report.releaseStateUnix}000`)).getDate() + 1}`
									: new Date(Number(`${report.releaseStateUnix}000`)).getDate() + 1}.
								{new Date(Number(`${report.releaseStateUnix}000`)).getMonth() + 1 < 10
									? `0${new Date(Number(`${report.releaseStateUnix}000`)).getMonth() + 1}`
									: new Date(Number(`${report.releaseStateUnix}000`)).getMonth() + 1}.
								{new Date(Number(`${report.releaseStateUnix}000`)).getFullYear()}
							</div>
						</div>
            <div className={style.actions}>
              <div className={style.reason} onClick={() => {
                showMoveReason({
                  title: 'Основание отмены',
                  type: 'info',
                  text: report.releaseStateReason,
                })
              }}>Основание отмены</div>
              <div
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
              </div>
            </div>
          </div>
        )) : <div className={style.emptyList}>Список пока пуст...</div>}
      </div>
    </>
  );
};
