import React from 'react';
import style from './index.module.css';

import { idKey } from '../../utilites/idKey';

import DiseaseModalResultSearch from './DiseaseModalResultSearch';

function ModalResultSearch({
  setToc,
  setExpand,
  setUpdateToc,
  diseases = [],
  view,
}) {
  if (diseases.length >= 60) {
    return (
      <div className={style[view]}>
        {diseases.map((disease, index) => {
          if (index < 60) {
            return (
              <DiseaseModalResultSearch
                setToc={setToc}
                setExpand={setExpand}
                setUpdateToc={setUpdateToc}
                key={idKey()}
                disease={disease}
              />
            );
          }
        })}
        <p className={style.infoSearchText}>
          Отображены не все результаты поиска. Вы можете уточнить поисковой
          запрос.
        </p>
      </div>
    );
  } else {
    return (
      <div className={style[view]}>
        {diseases.map(disease => (
          <DiseaseModalResultSearch
            setToc={setToc}
            setExpand={setExpand}
            setUpdateToc={setUpdateToc}
            key={idKey()}
            disease={disease}
          />
        ))}
      </div>
    );
  }
}

export default ModalResultSearch;
