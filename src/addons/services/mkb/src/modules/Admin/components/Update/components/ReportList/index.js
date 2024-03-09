import React from 'react';
import style from './index.module.css';
import download from './assets/download.svg';
import reload from './assets/reload.svg';
import { useEffect } from 'react';
import { idKey } from '@src/utilites/idKey';
import isEmpty from "../../../../../../utilites/isEmpty";


const filter = (version, self, l, md) => {
    let current = self
    let maxDate = md
    let lang = l

    for(let i = 0; i < version.length ; ++i) {
        const currentData = version[i].releaseID.split('-')
        if(maxDate[0] < currentData[0]) {
            if(lang === 'ru') {
                if(version.lang === 'ru') {
                    maxDate = currentData
                    current = version[i]
                    lang = version[i].Lang
                }
            } else {
                maxDate = currentData
                current = version[i]
                lang = version[i].Lang
            }
        }

        if(parseInt(maxDate[0], 10) === parseInt(currentData[0], 10) && maxDate[1] < currentData[1]) {
            if(lang === 'ru') {
                if(version.lang === 'ru') {
                    maxDate = currentData
                    current = version[i]
                }
            } else {
                maxDate = currentData
                current = version[i]
            }
        }

        if(maxDate[0] === currentData[0] && parseInt(maxDate[1], 10) === parseInt(currentData[1], 10) && lang !== 'ru') {
            maxDate = currentData
            current = version[i]
        }
    }
    return current
}

const getLast = (list) => {
    if(!isEmpty(list)) {
        const ru = list.filter(item => item.lang === "ru")
        const en = list.filter(item => item.lang === "en")
        let current = !isEmpty(ru) ? filter(ru, [], '', [0, 0]) : []
        let maxDate = !isEmpty(current) ? current.releaseID.split('-') : [0, 0]
        let lang = !isEmpty(current) ? current.Lang : ''
        let all = ru.concat(en)
        current = filter(all, current, lang, maxDate)
       return  current
    }

    return undefined
}
export const ReportList = ({ reportList, update, downloadRelease }) => {
  const current = getLast(reportList)

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
            {`Версии МКБ-11 на портале ВОЗ`}
        </div>
        <div className={style.list}>
          {reportList.map(report => {
            const isCurrent =  !!report.isICDLatest
            return (
              <div className={style.item} key={idKey()}>
                <p className={style.currentTitle}>{report.title}</p>
                {isCurrent && <span className={style.current}>{`(Новая)`}</span>}
                <img
                  src={download}
                  alt=""
                  onClick={() => downloadRelease(report.releaseID, report.lang)}
                  className={style.currentImg}
                />
              </div>
            )})}
        </div>
      </div>
    </div>
  );
};
