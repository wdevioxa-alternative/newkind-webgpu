import React, { useState, useCallback, useEffect } from 'react';
import style from './index.module.css';
import InputSearch from '../../../../components/InputSearch';
import WordList from '../../../../components/DiagnosisCoding/WordList';
import ResultSearch from '../../../../components/DiagnosisCoding/ResultSearch';
import Filters from '../../../../components/DiagnosisCoding/Filters/index';
import { search } from '../../../../utilites/search';
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import {isMobile} from "react-device-detect";
import { useDispatch } from 'react-redux';
import { checkBoxStateCheckedAction } from '../../reducers/checkbox';

export const Coding = ({ ismobileleftmenu, setmobileleftmenu }) => {
  const [typeInputSearch, _setTypeInputSearch] = useState('input-search');
  const [diseases, setDiseases] = useState([]);
  const [diseasesForFilter, setDiseasesForFilter] = useState([]);
  const [words, setWords] = useState([]);
  const [codeDisease, setCodeDisease] = useState('');
  const [wordForAddBySearchInInput, setWordForAddBySearchInInput] = useState('');
  const [dataFilter, setDataFilter] = useState({isFull: false});
  const [infoForFilter, setInfoForFilter] = useState([]);
	const [isEmptyData, setEmptyData] = useState(false);
	const [isCloseFilter, setIsCloseFilter] = useState(true);
	const dispatch = useDispatch();
  const  inputValue= useCallback(async value => {
		if (value) {
      const resultSearch = await search.getResult(value);
      const resultGetChangeWords = search.getChangeWords(resultSearch);
      const dataForFilter = search.filterChapter(resultSearch);
      setDiseases(resultSearch);
      setDiseasesForFilter(resultSearch);
      setWords(resultGetChangeWords);
      setDataFilter(dataForFilter)
			setEmptyData(true);
			setInfoForFilter([]);
    } else {
      setEmptyData(false);
    }
  }, []);

  const codeDiseaseChoice = useCallback(code => {
    setCodeDisease(`Выбрано: ${code}`);
  }, []);

  const addWordFromWordList = word => {
    setWordForAddBySearchInInput(word);
  };

	const getParamsFilter = useCallback(checkbox => {
    setInfoForFilter(prev => {
      if (
        !checkbox.state &&
        !!checkbox.typeCode &&
        !prev.includes(checkbox.typeCode)
      ) {
				return [...prev, checkbox.typeCode];
			}
			if (checkbox.state && prev.includes(checkbox.typeCode)) {
				let newPrev = prev.filter(el => el !== checkbox.typeCode);
				return newPrev;
			}
			return prev;
		});
	}, []);

  function filterChapter(diseasesForFilter, filters) {
    if (filters.length === 0) {
      return diseasesForFilter;
    }

    let newDiseases = diseasesForFilter.filter(
      disease => !filters.includes(disease.entity.code[0]),
    );
    return newDiseases;
	}

	const openCloseFilter = useCallback(() => {
		setIsCloseFilter(prev => !prev);
	}, []);

	useEffect(() => {
		dispatch(checkBoxStateCheckedAction.setStateChecked(infoForFilter));
    const filterResultSearch = filterChapter(diseasesForFilter, infoForFilter);
    setDiseases(() => filterResultSearch);
  }, [infoForFilter]);

  const isMkb = true
  return (
      <>
      {isMkb ? (
          <div className={style.wrapper}>
              <div className={style.inputContainer}>
                  <InputSearch
                      className={style}
                      inputValue={inputValue}
                      typeInputSearch={typeInputSearch}
                      wordForAddBySearchInInput={wordForAddBySearchInInput}
                  >
                      {!isMobile &&
                          <Breadcrumbs className={style} />
                      }

                  </InputSearch>
                  <div className={style.choiceCode}>{codeDisease}</div>
              </div>
              {/* <CopyLine/> */}
              {isEmptyData &&
                  <div className={style.contentContainer}>
                      <div className={style.wordList}>
                          <WordList words={words} addWordFromWordList={addWordFromWordList} />
                      </div>
                      <div
                          className={
                              isCloseFilter
                                  ? `${style.resultSearch} ${style.closeFilter}`
                                  : `${style.resultSearch}`
                          }
                      >
                          <ResultSearch
                              diseases={diseases}
                              codeDiseaseChoice={codeDiseaseChoice}
                              ismobileleftmenu={ismobileleftmenu}
                              setmobileleftmenu={setmobileleftmenu}
                              isCloseFilter={isCloseFilter}
                          />
                      </div>
                      <div
                          className={
                              isCloseFilter
                                  ? `${style.filters} ${style.closeFilter}`
                                  : `${style.filters}`
                          }
                      >
                          <Filters
                              dataFilter={dataFilter}
                              getParamsFilter={getParamsFilter}
                              openCloseFilter={openCloseFilter}
                          />
                      </div>
                  </div>}
          </div>
      ): (
          <slot name={'welcome'}></slot>
      )}
  </>);
};

export default Coding;
