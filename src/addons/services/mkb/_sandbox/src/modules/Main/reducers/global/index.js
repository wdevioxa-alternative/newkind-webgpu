import { createSymbiote } from 'redux-symbiote';

export const initialState = {
    version: '',
    device: '',
    coordination: {
        toc: {},
        tree: {
            x: -572,
            y: 100,
            width: 900,
            height: 675
        }
    }
};

export const {
  actions: globalActions,
  reducer: globalReducer
} = createSymbiote(
    initialState,{
    api: (state, _payload) => {
        return {...state}
    },
    initial: (state, _payload) => {
        return {...state}
    },
    coordination: {
        tree: (state, _payload) => ({
            coordination: {
                ...state.coordination,
                tree: {
                    ..._payload
                }
            }
        }),
        toc: (state, _payload) => ({
            coordination: {
                ...state.coordination,
                toc: {
                    ..._payload
                }
            }
        })
    }
  },'@global'
);

