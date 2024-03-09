import React, { useState, useEffect } from 'react';
import style from './index.module.css';
import { idKey } from '@src/utilites/idKey';
import { utilites } from '../../utilites';

export const PublishedVersions = ({ reportList, move, showMoveReason }) => {
  const [list, setList] = useState([]);
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
  return (
    <>
      <h5>Список опубликованных в РФ версий МКБ-11</h5>
      <div className={style.container}>
        {list.length ? list.map((report, idx) => (
          // <div className={`${style.item} ${idx === 0 ? style.current : style.archive}`} key={idKey()}>
					<div className={`${style.item}`} key={idKey()}>
						<div className={style.titleStatusContainer}>
            	<div className={style.title}>
								{report.title}{' '}
								{idx === 0
									? (<span className={style.subtitleGreen}>(опубликована на портале ФНСИ)</span>)
									: (<span className={style.subtitle}>(архивная версия)</span>)
								}
							</div>
							<div className={style.status}>
								Дата публикации
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
              {/* <div className={style.download}>Скачать контейнер</div> */}
              {/* <div className={style.report}>Отчет об изменениях</div> */}
              <div className={style.reason} onClick={() => {
                showMoveReason({
                  title: 'Основание публикации',
                  type: 'info',
                  text: report.releaseStateReason,
                })
              }}>Основание публикации</div>
              <div
                className={style.cancel}
                onClick={() =>
                  move({
                    releaseID: report.releaseID,
                    releaseState: report.releaseState,
                    toState: 4,
                    lang: report.lang,
										firstBase: idx === 0 ? true : false,
                  })
                }
              >
                Отменить
              </div>
            </div>
          </div>
        )) : <div className={style.emptyList}>Список пока пуст...</div>}
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
