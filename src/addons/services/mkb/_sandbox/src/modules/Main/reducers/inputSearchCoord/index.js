import { createSymbiote } from 'redux-symbiote';

export const initialState = {
	inputSearchCoordValue: '',
	axisName: '',
	scaleEntityNotes: [],
	scaleEntityNotesGray: []
};

export const {
  actions: inputSearchCoordActions,
  reducer: inputSearchCoordReducer,
} = createSymbiote(
    initialState,  {
    setResultSearch: (state, payload) => {
			const { inputSearchCoordValue, axisName, scaleEntityNotes, scaleEntityNotesGray } = payload;
			const newState = state;
			newState.inputSearchCoordValue = inputSearchCoordValue;
			newState.axisName = axisName;
			newState.scaleEntityNotes = scaleEntityNotes;
			newState.scaleEntityNotesGray = scaleEntityNotesGray;
			return newState;
    },
    deleteResultSearch: (state, _payload) => {
			const newState = state;
			newState.inputSearchCoordValue = '';
			newState.scaleEntityNotes = [];
			newState.scaleEntityNotesGray = [];
      return newState;
    },
  },'@inputSearchCoord'
);
