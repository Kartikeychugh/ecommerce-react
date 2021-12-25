import { Action, Dispatch } from "redux";

import { CurrentUser } from "../../../firebase/firebase.types";

export const UserAction = (dispatch?: Dispatch<Action<any>>) => {
  return {
    userSessionStart: (user: CurrentUser) => {
      dispatch!!!({ type: "USER_SESSION_START", payload: user });
    },
    userSessionEnd: () => {
      dispatch!!!({ type: "USER_SESSION_END", payload: null });
    },
    userProfileUpdate: (displayName: string) => ({
      type: "USER_PROFILE_UPDATE",
      payload: displayName,
    }),
  };
};
