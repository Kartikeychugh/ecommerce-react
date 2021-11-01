import {
  DirectoryActionTypes,
  DirectoryPayloadType,
  DirectoryReducerAction,
  DirectoryReducerManagedState,
} from "./directory.types";

import { DirectoryData } from "../../../assests/data";
import { Reducer } from "react";

const INITIAL_STATE = {
  sections: DirectoryData,
};
export const directoryReducer: Reducer<
  DirectoryReducerManagedState,
  DirectoryReducerAction<DirectoryActionTypes, DirectoryPayloadType>
> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
