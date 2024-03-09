import React, { useEffect } from 'react';
import style from './index.module.css';
import { LoadingProgressBar } from '../LoadingProgressBar';
import { idKey } from '@src/utilites/idKey';

export const Raw = ({ reportList = [], move, remove, isLoading, titleLoadingVersion }) => {
  // useEffect(() => console.log(isLoading), [isLoading]);
  return (
    <>
      <h5>Ожидает рассмотрения</h5>
      <div className={style.container}>
        {reportList.length ? reportList.map(report => (
          <div className={style.item} key={idKey()}>
            <div className={style.title}>{report.title}</div>
            {/* <div className={style.status}>
                        Статус:<br/>
                        ожидает согласования<br/>
                        тестирование успешно<br/>
                    </div> */}
            <div className={style.actions}>
              {/* <div className={style.report}>Отчет об изменениях</div> */}
              <div
                className={style.approve}
                onClick={() =>
                  move({
                    releaseID: report.releaseID,
                    releaseState: report.releaseState,
                    toState: report.releaseState + 1,
                    loadedAtUnix: new Date(report.loadedAt).getTime() / 1000,
                    lang: report.lang,
                    reason: "some real reason",
                  })
                }
              >
                Перейти к рассмотрению
              </div>
              {/* <div className={style.cancel}>Отменить</div> */}
              <div
                className={style.delete}
                onClick={() =>
                  remove({
                    releaseID: report.releaseID,
                    releaseState: report.releaseState,
                    loadedAtUnix: new Date(report.loadedAt).getTime() / 1000,
                    lang: report.lang,
                  })
                }
              >
                Удалить
              </div>
            </div>
          </div>
				)) : <div className={style.emptyList}>Список пока пуст...</div>}
				{isLoading &&
					<div className={style.loading}>
						<div className={style.title}>{titleLoadingVersion}</div>
						<LoadingProgressBar isLoading={isLoading} />
					</div>
				}
      </div>
    </>
  );
};
