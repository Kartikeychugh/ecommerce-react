import { BrowserRouter } from "react-router-dom";
import { FirebaseProvider } from "./core/firebase";
import { Layout } from "./core/layout/layout.component";
import { Login } from "./core/auth";
import React from "react";
import { firebaseConfig } from "./core/firebase/firebase.config";

type AppState = {};
type AppProps = {};

class AppInternal extends React.Component<AppProps, AppState> {
  public render() {
    return (
      <BrowserRouter>
        <FirebaseProvider config={firebaseConfig}>
          <Login>
            <Layout />
          </Login>
        </FirebaseProvider>
      </BrowserRouter>
    );
  }
}

export const App = AppInternal;
