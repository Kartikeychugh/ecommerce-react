import { BrowserRouter } from "react-router-dom";
import { FirebaseProvider } from "./core/firebase";
import { Layout } from "./core/components/layout/layout.component";
import React from "react";
import { ReduxProvider } from "./core/redux";
import { firebaseConfig } from "./core/firebase/firebase.config";

type AppState = {};
type AppProps = {};

class AppInternal extends React.Component<AppProps, AppState> {
  public render() {
    return (
      <BrowserRouter>
        <FirebaseProvider config={firebaseConfig}>
          <ReduxProvider>
            <Layout />
          </ReduxProvider>
        </FirebaseProvider>
      </BrowserRouter>
    );
  }
}

export const App = AppInternal;
