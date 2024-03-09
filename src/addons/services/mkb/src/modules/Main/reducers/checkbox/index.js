import { createSymbiote } from 'redux-symbiote';

export const initialState = [];
// [{stateCheck: true|false, typeCode: str, countCode: int}]

export const {
  actions: checkBoxStateCheckedAction,
  reducer: checkBoxStateCheckedReducer,
} = createSymbiote(
    initialState,  {
		setStateChecked: (_state, payload) => {
      return payload;
    },
		deleteStateChecked: (_state, _payload) => {
			return [];
		}
  },'@checked'
);
