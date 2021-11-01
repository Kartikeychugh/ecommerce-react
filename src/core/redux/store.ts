import { applyMiddleware, createStore } from "redux";

import { Thunk } from "./middleware/test";
import { logger } from "redux-logger";
import { persistStore } from "redux-persist";
import { reducer } from "./root.reducer";

const middlewares = [logger, Thunk];

export const store = createStore(reducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
