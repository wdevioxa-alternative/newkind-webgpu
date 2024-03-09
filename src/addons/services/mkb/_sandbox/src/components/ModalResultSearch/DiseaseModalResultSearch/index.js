import React, { useState } from 'react';
import style from './index.module.css';

import { useNavigate } from 'react-router-dom';
import { href } from '../../../utilites/Icd-11';
import { idKey } from '../../../utilites/idKey';
import { useDispatch } from "react-redux";
import { tocActions } from "../../../modules/Main/reducers/tableOfContent";
import IndexTermModalResultSearch from '../IndexTermModalResultSearch';
import DescendantModalResultSearch from '../DescendantModalResultSearch';

function DiseaseModalResultSearch({ disease, setToc, setExpand, setUpdateToc }) {

  const [isOpen, setIsOpen] = useState(false);
	const [isBlueTitle, setIsBlueTitle] = useState(disease.entity.isBlueTitle);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickHandler = event => {
    event.preventDefault();

    let request = {
      pathname: new URL(`${window.location.origin}${disease.uri}`).pathname,
      href: new URL(`${window.location.origin}${disease.uri}`).href
    }
      navigate(href.decoder(disease.uri, window.location.pathname === '/coding' ? 'coding': 'page'))
      dispatch(
        tocActions.fetchSearch({
          pathname: request,
          type: 'window',
          cb: (error, content) => {
            if (error) {
              console.log('error', error)
              return;
            }
            setToc(content.data)
            setExpand(content.expand)
            setUpdateToc(undefined)
          }
        })
    );
  };

  const onClickOpen = () => {
    setIsOpen(prev => !prev);
  };

	if (disease.descendants) {
		return (
			<div className={style.wrapper}>
      <div onClick={onClickHandler} className={style.diseaseTitle}>
        <div className={style.code}>{disease.entity.code}</div>
        <div
          className={style.word}
          dangerouslySetInnerHTML={{ __html: disease.title }}
        ></div>
      </div>

		{disease.descendants.map(descendant =>
				<DescendantModalResultSearch
					setToc={setToc}
					setExpand={setExpand}
					setUpdateToc={setUpdateToc}
					key={idKey()}
					disease={descendant}
				/>
			)}
			</div>
)
	}

  return (
    <div className={style.wrapper}>
      <div onClick={onClickHandler} className={isBlueTitle ? style.diseaseTitleBlue : style.diseaseTitle}>
        <div className={style.code}>{disease.entity.code}</div>
        <div
          className={style.word}
          dangerouslySetInnerHTML={{ __html: disease.title }}
        ></div>
      </div>
      {disease.entity.indexTerm && disease.entity.indexTerm.length === 1 && (
        <IndexTermModalResultSearch
          setToc={setToc}
          setExpand={setExpand}
          setUpdateToc={setUpdateToc}
          key={idKey()}
          term={disease.entity.indexTerm[0]}
          disease={disease}
        />
      )}
      {disease.entity.indexTerm &&
        disease.entity.indexTerm.length > 1 &&
        isOpen &&
        disease.entity.indexTerm.map((term, i) => (
          <IndexTermModalResultSearch
            setToc={setToc}
            setExpand={setExpand}
            setUpdateToc={setUpdateToc}
            key={idKey()}
            term={term}
            i={i}
            onClickOpen={onClickOpen}
            disease={disease}
          />
        ))}
      {disease.entity.indexTerm &&
        disease.entity.indexTerm.length > 1 &&
        !isOpen && (
          <IndexTermModalResultSearch
            setToc={setToc}
            setExpand={setExpand}
            setUpdateToc={setUpdateToc}
            key={idKey()}
            term={disease.entity.indexTerm[0]}
            i={0}
            onClickOpen={onClickOpen}
            disease={disease}
          />
        )}
    </div>
  );
}

export default DiseaseModalResultSearch;
