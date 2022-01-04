import React, { useContext } from "react";

import { Firebase } from "../../firebase";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { getStores } from "../init";

export const ReduxProvider = (props: React.PropsWithChildren<{}>) => {
  const { children } = props;
  const firebaseContext = useContext(Firebase);

  const { store, persistor } = getStores(firebaseContext);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
