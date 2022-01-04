import {
  DirectoryReducerAction,
  DirectoryReducerManagedState,
} from "./directory.types";

import { Reducer } from "react";
import { postSections } from "./directory.utils";

const INITIAL_STATE = {
  sections: null,
};
export const directoryReducer: Reducer<
  DirectoryReducerManagedState,
  DirectoryReducerAction
> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_SECTIONS_SUCCESS":
      return postSections(state, action.payload);
    default:
      return state;
  }
};
