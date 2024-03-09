import { createSymbiote } from 'redux-symbiote';

export const initialState = {
  version: '',
  device: '',
  coordination: {
    toc: {},
    tree: {
      x: -200,
      y: -400,
      width: 430,
      height: 350,
    },
  },
};

export const { actions: globalCoordActions, reducer: globalCoordReducer } =
  createSymbiote(
    initialState,
    {
      setCoorination: (state, payload) => {
        const { x, y, width, height } = payload;
        const newState = state;
        newState.coordination.tree.x = x;
        newState.coordination.tree.x = y;
        return newState;
      },
    },
    '@globalCoord',
  );
