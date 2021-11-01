import "./index.css";

import { persistor, store } from "./core/redux";

import { App } from "./App";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom";
import { Provider as ReduxStoreProvider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <ReduxStoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />{" "}
    </PersistGate>
  </ReduxStoreProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
