import { UserAction } from "./user.action";
import { useDispatch } from "react-redux";

export const useUserActions = () => {
  const dispatch = useDispatch();
  return UserAction(dispatch);
};
