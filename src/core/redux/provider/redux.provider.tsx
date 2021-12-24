import {
  Firebase,
  FirebaseAuthService,
  FirebaseStoreService,
} from "../../firebase";

import { GoogleAuthProvider } from "@firebase/auth";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import { createReduxStore } from "../store";

interface IReduxProviderProps {}
interface IReduxProviderState {}

export class ReduxProvider extends React.Component<
  IReduxProviderProps,
  IReduxProviderState
> {
  static contextType = Firebase;

  render() {
    const { store, persistor } = createReduxStore({
      firebaseStoreService: new FirebaseStoreService(
        this.context.firebaseStore
      ),
      firebaseAuthService: new FirebaseAuthService(
        this.context.firebaseAuth,
        new GoogleAuthProvider()
      ),
    });

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {this.props.children}
        </PersistGate>
      </Provider>
    );
  }
}
