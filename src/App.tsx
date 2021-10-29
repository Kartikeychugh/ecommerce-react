import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxStoreProvider } from "react-redux";

import { store } from "./core/redux";
import { Layout } from "./core/layout/layout.component";
import { Login } from "./core/auth";

type AppState = {};
type AppProps = {};

class AppInternal extends React.Component<AppProps, AppState> {
  public render() {
    return (
      <ReduxStoreProvider store={store}>
        <BrowserRouter>
          <Login>
            <Layout />
          </Login>
        </BrowserRouter>
      </ReduxStoreProvider>
    );
  }
}

export const App = AppInternal;
