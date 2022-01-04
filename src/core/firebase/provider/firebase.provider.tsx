import { FirebaseOptions, initializeApp } from "@firebase/app";

import { Firebase } from "../contexts";
import React from "react";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

interface FirebaseProviderProps {
  config: FirebaseOptions;
}

export const FirebaseProvider = (
  props: React.PropsWithChildren<FirebaseProviderProps>
) => {
  const initFirebase = () => {
    const firebaseApp = initializeApp(props.config);
    const firebaseAuth = getAuth(firebaseApp);
    const firebaseStore = getFirestore(firebaseApp);

    return { firebaseAuth, firebaseStore };
  };

  return (
    <Firebase.Provider
      value={{
        ...initFirebase(),
      }}>
      {props.children}
    </Firebase.Provider>
  );
};
