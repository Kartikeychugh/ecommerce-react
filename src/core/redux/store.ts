import { applyMiddleware, createStore } from "redux";

import { Thunk } from "./middleware/test";
import { logger } from "redux-logger";
import { rootReducer } from "./root.reducer";

const middlewares = [logger, Thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
