import {
  DirectoryActionTypes,
  DirectoryPayloadType,
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
  DirectoryReducerAction<DirectoryActionTypes, DirectoryPayloadType>
> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_SECTIONS":
      return postSections(state, action.payload);
    default:
      return state;
  }
};
