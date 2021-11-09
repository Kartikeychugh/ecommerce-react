import { CurrentUser } from "../../../../models";
import { UserReducerAction } from "./user.types";

export const setCurrentUser = (user: CurrentUser): UserReducerAction => ({
  type: "SET_CURRENT_USER",
  payload: user,
});
