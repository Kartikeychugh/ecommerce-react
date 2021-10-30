import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { Thunk } from "./middleware/test";

import rootReducer from "./root.reducer";

const middlewares = [logger, Thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
