import React from 'react';
import style from './index.module.css';
import { MainButton } from '@src/components/Button/Button';
import { idKey } from '@src/utilites/idKey';

export const WaitingForPublish = ({ reportList = [], moveForward, moveBack, remove }) => {
  return (
    <>
      <h5>Ожидает публикации</h5>
      <div className={style.container}>
        {reportList.length ? reportList.map(report => (
          <div className={style.item} key={idKey()}>
						<div className={style.titleStatusContainer}>
							<div className={style.title}>{report.title}</div>
							<div className={style.status}>
								Дата загрузки
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
                      window.open(`${window.location.origin}/testing/?Lang=${report.lang}&Release=${report.releaseID}`, '_blank')
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
              <MainButton buttonLabel={'Опубликовать'} buttonHandler={() =>
                moveForward({
                  releaseID: report.releaseID,
                  releaseState: report.releaseState,
                  toState: report.releaseState + 1,
                  lang: report.lang,
                })} />
            </div>
          </div>
        )) : <div className={style.emptyList}>Список пока пуст...</div>}
      </div>
    </>
  );
};
