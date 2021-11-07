import { Sections } from "../../../models";

export type DirectoryReducerManagedState = {
  sections: Sections;
};

export type DirectoryReducerAction = {
  type: DirectoryActionTypes;
  payload: DirectoryPayloadType;
};

export type DirectoryActionTypes = "UPDATE_SECTIONS";
export type DirectoryPayloadType = Sections;

export type DirectoryReducerStateManagers = (
  prevState: DirectoryReducerManagedState,
  payload: DirectoryPayloadType
) => DirectoryReducerManagedState;
