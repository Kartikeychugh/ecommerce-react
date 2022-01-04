import {
  FirebaseAuthListener,
  FirebaseProvider,
  Layout,
  ReduxProvider,
} from "./core";

import { BrowserRouter } from "react-router-dom";
import { firebaseConfig } from "./firebase.config";

const AppInternal = () => {
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
};

export const App = AppInternal;
