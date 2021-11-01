import { persistor, store } from "./core/redux";

import { BrowserRouter } from "react-router-dom";
import { Layout } from "./core/layout/layout.component";
import { Login } from "./core/auth";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import { Provider as ReduxStoreProvider } from "react-redux";

type AppState = {};
type AppProps = {};

class AppInternal extends React.Component<AppProps, AppState> {
  public render() {
    return (
      <ReduxStoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Login>
              <Layout />
            </Login>
          </BrowserRouter>
        </PersistGate>
      </ReduxStoreProvider>
    );
  }
}

export const App = AppInternal;
