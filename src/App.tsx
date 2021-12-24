import {
  FirebaseAuthListener,
  FirebaseProvider,
  Layout,
  ReduxProvider,
} from "./core";

import { BrowserRouter } from "react-router-dom";
import React from "react";
import { firebaseConfig } from "./firebase.config";

type AppState = {};
type AppProps = {};

class AppInternal extends React.Component<AppProps, AppState> {
  public render() {
    return (
      <BrowserRouter>
        <FirebaseProvider config={firebaseConfig}>
          <ReduxProvider>
            <FirebaseAuthListener>
              <Layout />
            </FirebaseAuthListener>
          </ReduxProvider>
        </FirebaseProvider>
      </BrowserRouter>
    );
  }
}

export const App = AppInternal;
