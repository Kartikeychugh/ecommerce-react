import { FirebaseActions } from "./firebase.actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const useFirebaseAction = () => {
  const dispatch = useDispatch();
  const [actions] = useState(FirebaseActions(dispatch));

  return actions;
};
