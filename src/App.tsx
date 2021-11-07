import { BrowserRouter } from "react-router-dom";
import { Layout } from "./core/layout/layout.component";
import { Login } from "./core/auth";
import React from "react";

type AppState = {};
type AppProps = {};

class AppInternal extends React.Component<AppProps, AppState> {
  public render() {
    return (
      <BrowserRouter>
        <Login>
          <Layout />
        </Login>
      </BrowserRouter>
    );
  }
}

export const App = AppInternal;
