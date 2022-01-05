import { FirebaseActions } from "./firebase.actions";
import { useDispatch } from "react-redux";

export const useFirebaseAction = () => {
  const dispatch = useDispatch();
  return FirebaseActions(dispatch);
};
