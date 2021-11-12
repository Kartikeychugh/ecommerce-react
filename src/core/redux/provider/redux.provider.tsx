import { FirebaseStoreService, withFirebase } from "../../firebase";

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
  render() {
    const Component = withFirebase((props) => {
      const { store, persistor } = createReduxStore({
        firebaseStoreService: new FirebaseStoreService(props.firebaseStore),
      });
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {this.props.children}
          </PersistGate>
        </Provider>
      );
    });

    return <Component />;
  }
}
