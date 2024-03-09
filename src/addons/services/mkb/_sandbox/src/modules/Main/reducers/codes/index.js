import { createSymbiote } from 'redux-symbiote';

export const initialState = {
  codes: {
		self: '',
	},
};

export const { actions: codesActions, reducer: codesReducer } =
  createSymbiote(
    initialState,
    {
      setCodes: (state, payload) => {
        const codesSelf = payload;
        const newState = state;
        newState.codes.self = codesSelf;
        return newState;
      },
			deleteCodes: (state, _payload) => {
				const newState = state;
				newState.codes.self = '';
				return newState;
			}
    },
    '@codes',
  );
