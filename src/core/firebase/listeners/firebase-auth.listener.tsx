import React, { useContext, useEffect } from "react";

import { Firebase } from "../contexts";
import { onAuthStateChanged } from "@firebase/auth";
import { useUserActions } from "../..";

interface FirebaseAuthListenerProps {}

export const FirebaseAuthListener = (
  props: React.PropsWithChildren<FirebaseAuthListenerProps>
) => {
  const { children } = props;
  const { firebaseAuth } = useContext(Firebase);
  const { userSessionStart, userSessionEnd } = useUserActions();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        userSessionStart(user);
      } else {
        userSessionEnd();
      }
    });
    return () => {
      unsubscribe();
    };
  }, [userSessionStart, userSessionEnd, firebaseAuth]);

  return <>{children}</>;
};
