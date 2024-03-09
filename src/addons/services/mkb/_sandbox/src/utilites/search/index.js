/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-cycle */
import { apiGetEntityLin } from './apiGetEntityLin';
import { apiGetChild } from './apiGetChild';
import { apiSearchWords } from './apiSearchWords';
import { apiSearchWordsCoord } from './apiSearchWordsCoord';
import { apiSearchWordsFields } from './apiSearchWordsFields';
import { apiSearchCode } from './apiSearchCode';
import { apiSearchWordsMain } from './apiSearchWordsMain';
import { apiSearchCodeCoord } from './apiSearchCodeCoord';

import { searchCode } from './searchCode';
import { searchWords } from './searchWords';
import { searchWordsCodeWithVX } from './searchWordsCodeWithVX';
import { searchWordsFields } from './searchWordsFields';
import { searchWordsCodeCoord } from './searchWordsCodeCoord';
import { searchWordsMain } from './searchWordsMain';

import { getResult } from './getResult';
import { getPerinatal } from './getPerinatal';
import { getMaternal } from './getMaternal';
import { getRed } from './getRed';
import { getChangeWords } from './getChangeWords';
import { getArrayIdScaleEntity } from './getArrayIdScaleEntity';
import { getResultForAdvancedSearch } from './getResultForAdvancedSearch';
import { getRedFields } from './getRedFields';
import { getResultCoord } from './getResultCoord';
import { getResultWithVX } from './getResultWithVX';
import { getResultMain } from './getResultMain';
import { getRedMainSearch } from './getRedMainSearch';
import { getDescendantsMain } from './getDescendantsMain';

import { filterChapter } from './filterChapter';
import { validationCode } from './validationCode';
import { changeUriForGetLinearization } from './searchWords';
import { makeRedWords } from './makeRedWords';

export const decoder = {
  searchCode,
  validationCode,
};

export const search = {
  searchWords,
  getResult,
  getPerinatal,
  getMaternal,
  getRed,
  getRedFields,
  getChangeWords,
  filterChapter,
  changeUriForGetLinearization,
	getArrayIdScaleEntity,
	getResultForAdvancedSearch,
	searchWordsFields,
	searchWordsCodeCoord,
	getResultCoord,
	getResultWithVX,
	searchWordsCodeWithVX,
	makeRedWords,
	searchWordsMain,
	getResultMain,
	getRedMainSearch,
	getDescendantsMain,
  api: {
    apiSearchWords,
    apiGetEntityLin,
    apiGetChild,
		apiSearchCode,
		apiSearchWordsFields,
		apiSearchWordsCoord,
		apiSearchWordsMain,
		apiSearchCodeCoord,
  },
};
