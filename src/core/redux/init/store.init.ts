import { FirebaseContext } from "../../firebase";
import { createReduxStore } from "../store";
import { getServices } from "./services.init";

export const getStores = (firebaseContext: FirebaseContext) => {
  return createReduxStore(getServices(firebaseContext));
};
