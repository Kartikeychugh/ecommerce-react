import { RootState } from "..";
import { createSelector } from "reselect";

const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user: RootState["user"]) => user.currentUser
);
