import { CurrentUser } from "../../../models";
import { ReducerAction } from "./types";

export const setCurrentUser = (user: CurrentUser): ReducerAction => ({
  type: "SET_CURRENT_USER",
  payload: user,
});
