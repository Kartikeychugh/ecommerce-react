import { Middleware } from "redux";
export const Mylogger: Middleware = (store) => (next) => (action) => {
  console.log("Myloggerdispatching", action);
  let result = next(action);
  console.log("Mylogger result", result);
  return result;
};

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
