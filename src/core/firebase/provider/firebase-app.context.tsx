import { FirebaseApp as IFirebaseApp } from "@firebase/app";
import React from "react";

export const FirebaseApp = React.createContext<IFirebaseApp | null>(null);
