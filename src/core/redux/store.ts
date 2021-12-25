import { applyMiddleware, createStore } from "redux";
import {
  initFirebaseAuthSaga,
  initFirebaseStoreSaga,
} from "./reducers/firebase";

import { IServices } from "./init/services.init";
import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import { persistStore } from "redux-persist";
import { reducer } from "./root.reducer";
import thunk from "redux-thunk";

export const createReduxStore = (services: IServices) => {
  const middlewares = [];
  const sagaMiddleware = createSagaMiddleware();

  middlewares.push(thunk.withExtraArgument(services));
  middlewares.push(sagaMiddleware);

  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }

  const store = createStore(reducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);

  function* rootSaga() {
    yield all([
      ...initFirebaseAuthSaga(services.firebase.firebaseAuthService),
      ...initFirebaseStoreSaga(services.firebase.firebaseStoreService),
    ]);
  }
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
