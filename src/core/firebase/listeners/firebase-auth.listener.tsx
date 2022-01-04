import React, { useContext, useEffect } from "react";

import { CurrentUser } from "../firebase.types";
import { Firebase } from "../contexts";
import { UserAction } from "../../redux/reducers/user/user.action";
import { connect } from "react-redux";
import { onAuthStateChanged } from "@firebase/auth";

interface FirebaseAuthListenerProps {
  userSessionStart: (user: CurrentUser) => void;
  userSessionEnd: () => void;
}

const FirebaseAuthListenerInternal = (
  props: React.PropsWithChildren<FirebaseAuthListenerProps>
) => {
  const { userSessionStart, userSessionEnd, children } = props;
  const { firebaseAuth } = useContext(Firebase);

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

export const FirebaseAuthListener = connect(null, (dispatch: any) => {
  const { userSessionStart, userSessionEnd } = UserAction(dispatch);
  return {
    userSessionStart,
    userSessionEnd,
  };
})(FirebaseAuthListenerInternal);
