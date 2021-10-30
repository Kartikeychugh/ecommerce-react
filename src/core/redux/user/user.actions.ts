import { CurrentUser } from "../../../models";
import { UserReducerAction } from "./user.types";

export const setCurrentUser = (
  user: CurrentUser
): UserReducerAction<"SET_CURRENT_USER", CurrentUser> => ({
  type: "SET_CURRENT_USER",
  payload: user,
});
