import { createSymbiote } from 'redux-symbiote';
import { href } from '../../../../utilites/Icd-11'
import isEmpty from "../../../../utilites/isEmpty";
export const initialState = {
    chapter: [],
    pages: {},
    current: null,
    isLoading: false
};

export const {
  actions: tocActions,
  reducer: tocReducer
} = createSymbiote(
    initialState,  {
    setLoading: (state, _payload) => {
        return {
            ...state,
            isLoading: _payload
        }
    },
    fetchChapter: (state, _payload) => ({
      ...state
    }),
    setPage: (state, _payload, type) => {
        state.pages[`${href.decoder(_payload.id, type)}`] = _payload
        state.pages = {
            ...state.pages
        }
        return state
    },
    fetchChildren: (state, _payload) => ({
      ...state
    }),
    fetchSearch: (state, _payload) => ({
        ...state
    }),
    setChapter: (state, _payload) => {
        state.chapter = _payload
        return state
    },
    setExpand: (state, _payload) => {
        state.expand = _payload
        return state
    },
    setCurrent: (state, _payload) => {
        state.current = _payload
        return state
    },
  },'@toc'
);

