import { applyMiddleware, createStore } from "redux";

import { logger } from "redux-logger";
import { persistStore } from "redux-persist";
import { reducer } from "./root.reducer";
import thunk from "redux-thunk";

export const createReduxStore = (extraArgumentsForThunk = {}) => {
  const middlewares = [];
  middlewares.push(thunk.withExtraArgument(extraArgumentsForThunk));

  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }

  const store = createStore(reducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);
  return { store, persistor };
};
