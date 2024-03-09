import { createSymbiote } from 'redux-symbiote';

export const initialState = {
	infoResultSearch: null,
	isResultSearch: false,
	infoWordSearch: '',
};

export const {
  actions: searchActions,
  reducer: searchReducer,
} = createSymbiote(
    initialState,  {
    setResultSearch: (state, payload) => {
				const { response, isResponse, wordForResponse } = payload;
				const newState = state;
        newState.infoResultSearch = response;
        newState.isResultSearch = isResponse;
        newState.infoWordSearch = wordForResponse;
        return newState;
    },
    deleteResultSearch: (state, payload) => {
			const { wordForResponse } = payload;
				const newState = state;
				newState.infoResultSearch = [];
        newState.isResultSearch = false;
        newState.infoWordSearch = wordForResponse;
        return newState;
    },
  },'@search'
);
