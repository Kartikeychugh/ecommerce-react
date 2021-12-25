import { Firebase } from "../../firebase";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import { getStores } from "../init";

interface IReduxProviderProps {}
interface IReduxProviderState {}

export class ReduxProvider extends React.Component<
  IReduxProviderProps,
  IReduxProviderState
> {
  static contextType = Firebase;

  render() {
    const { store, persistor } = getStores(this.context);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {this.props.children}
        </PersistGate>
      </Provider>
    );
  }
}
