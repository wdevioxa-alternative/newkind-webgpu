import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { href } from '../../../utilites/Icd-11';
import { idKey } from '../../../utilites/idKey';
import style from './index.module.css';

import { tocActions } from '../../../modules/Main/reducers/tableOfContent';
import IndexTermModalResultSearch from '../IndexTermModalResultSearchField';

function DiseaseModalResultSearchField({
  setToc,
  setExpand,
  setUpdateToc,
  disease,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickHandler = _event => {
    console.log(
      '[(DiseaseModalResultSearch): onClickHandler]: сработал onClick=',
    );

    let request = {
      pathname: new URL(`${window.location.origin}${disease.uri}`).pathname,
      href: new URL(`${window.location.origin}${disease.uri}`).href,
    };

    navigate(`${href.decoder(disease.uri)}`);
    dispatch(
      tocActions.fetchSearch({
        pathname: request,
        type: 'window',
        cb: (error, content) => {
          if (error) {
            console.log('error', error);
            return;
          }
          setToc(content.data);
          setExpand(content.expand);
          setUpdateToc(undefined);
        },
      }),
    );
  };

  return (
		<div className={style.wrapper} onClick={onClickHandler}>
			<div className={style.codeWord}>
      <div className={style.code}>{disease.code}</div>

      <div
        className={style.word}
        dangerouslySetInnerHTML={{ __html: disease.title }}
				></div>
			</div>
      {disease.inscription.length > 0 &&
        disease.inscription.map(term => (
          <IndexTermModalResultSearch key={idKey()} term={term} />
        ))}
    </div>
  );
}

export default DiseaseModalResultSearchField;
