import { CurrentUser } from "../../../models";
import { ReducerAction } from "./user.types";

export const setCurrentUser = (user: CurrentUser): ReducerAction => ({
  type: "SET_CURRENT_USER",
  payload: { currentUser: user },
});
