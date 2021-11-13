import { CurrentUser } from "../firebase.types";
import React from "react";

export interface FirebaseUserContext {
  user: CurrentUser;
}

export const FirebaseUser = React.createContext<FirebaseUserContext>(
  undefined!
);
