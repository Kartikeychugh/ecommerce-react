import { BrowserRouter } from "react-router-dom";
import { FirebaseApp } from "./core/firebase/provider/firebase-app.context";
import { Layout } from "./core/layout/layout.component";
import { Login } from "./core/auth";
import React from "react";
import { firebase_app } from "./core/firebase/firebase.app";

type AppState = {};
type AppProps = {};

class AppInternal extends React.Component<AppProps, AppState> {
  public render() {
    return (
      <BrowserRouter>
        <FirebaseApp.Provider value={firebase_app}>
          <Login>
            <Layout />
          </Login>
        </FirebaseApp.Provider>
      </BrowserRouter>
    );
  }
}

export const App = AppInternal;
