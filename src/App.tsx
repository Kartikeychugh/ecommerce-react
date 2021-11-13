import {
  FirebaseAuthProvider,
  FirebaseProvider,
  FirebaseUserProvider,
  firebaseConfig,
} from "./core/firebase";

import { BrowserRouter } from "react-router-dom";
import { Layout } from "./core/components";
import React from "react";
import { ReduxProvider } from "./core/redux";

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
