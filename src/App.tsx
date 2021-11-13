import {
  FirebaseAuthProvider,
  FirebaseProvider,
  FirebaseUserProvider,
} from "./core";

import { BrowserRouter } from "react-router-dom";
import { Layout } from "./core/components";
import React from "react";
import { ReduxProvider } from "./core/redux";
import { firebaseConfig } from "./firebase.config";

type AppState = {};
type AppProps = {};

class AppInternal extends React.Component<AppProps, AppState> {
  public render() {
    return (
      <BrowserRouter>
        <FirebaseProvider config={firebaseConfig}>
          <FirebaseUserProvider>
            <FirebaseAuthProvider>
              <ReduxProvider>
                <Layout />
              </ReduxProvider>
            </FirebaseAuthProvider>
          </FirebaseUserProvider>
        </FirebaseProvider>
      </BrowserRouter>
    );
  }
}

export const App = AppInternal;
