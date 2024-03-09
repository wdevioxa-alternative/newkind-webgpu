import { combineReducers } from 'redux';
import { tocReducer } from './tableOfContent';
import { coordinationReducer } from './coordination';
import { globalReducer } from './global'
import { searchReducer } from './search'
import { inputSearchCoordReducer } from './inputSearchCoord'
import { globalCoordReducer } from './globalCoord'
import { codesReducer } from './codes'
import { checkBoxStateCheckedReducer } from './checkbox'

export const mainMapReducer = combineReducers({
  toc: tocReducer,
  coordination: coordinationReducer,
  global: globalReducer,
	search: searchReducer,
	inputSearchCoord: inputSearchCoordReducer,
	globalCoord: globalCoordReducer,
	codes: codesReducer,
	checked: checkBoxStateCheckedReducer,
});

export default mainMapReducer;
