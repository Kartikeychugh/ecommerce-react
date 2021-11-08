import { Middleware } from "redux";

export const Thunk: Middleware =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    } else {
      return next(action);
    }
  };

export const createThunkMiddleware = () => {
  let extraArguments: { [key: string]: any } = {};

  return {
    withExtraArguments: (_extraArguments: { [key: string]: any }) => {
      extraArguments = _extraArguments;
    },
    getInstance: (): Middleware => {
      return ({ getState, dispatch }) =>
        (next) =>
        (action) => {
          if (typeof action === "function") {
            return action(dispatch, getState, extraArguments);
          } else {
            return next(action);
          }
        };
    },
  };
};
