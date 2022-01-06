import { UserAction } from "./user.action";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const useUserActions = () => {
  const dispatch = useDispatch();
  const [userAction] = useState(UserAction(dispatch));
  return userAction;
};
