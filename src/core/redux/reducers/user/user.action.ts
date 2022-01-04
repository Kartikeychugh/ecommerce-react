import { Action, Dispatch } from "redux";

import { CurrentUser } from "../../../firebase/firebase.types";

export const UserAction = (dispatch?: Dispatch<Action<any>>) => {
  return {
    userSessionStartInitiate: () => ({ type: "USER_SESSION_CHANGE_INITIATE" }),
    userSessionStartComplete: () => ({ type: "USER_SESSION_CHANGE_COMPLETE" }),
    userSessionStart: (user: CurrentUser) => {
      dispatch!!!({ type: "USER_SESSION_STARTED", payload: user });
    },
    userSessionEnd: () => {
      dispatch!!!({ type: "USER_SESSION_ENDED", payload: null });
    },
    userProfileUpdate: (displayName: string) => ({
      type: "USER_PROFILE_UPDATE",
      payload: displayName,
    }),
  };
};
