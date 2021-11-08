import { applyMiddleware, createStore } from "redux";

import { firebase_app } from "../firebase/firebase.app";
// import { Thunk } from "./middleware/test";
import { logger } from "redux-logger";
import { persistStore } from "redux-persist";
import { reducer } from "./root.reducer";
import thunk from "redux-thunk";

const middlewares = [];
middlewares.push(thunk.withExtraArgument({ firebase_app }));

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(reducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
