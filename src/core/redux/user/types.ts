import { CurrentUser, IUser } from "../../../models";

export type ReducerManagedState = { currentUser: CurrentUser };
export type ReducerAction = {
  type: "SET_CURRENT_USER" | "SET_CURRENT_USER_DISPLAYNAME";
  payload: CurrentUser;
};
