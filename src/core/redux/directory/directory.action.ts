import { DirectoryReducerAction } from "./directory.types";
import { ISection } from "../../../models";

export const updateSectionsState = (
  payload: ISection[]
): DirectoryReducerAction => {
  return {
    type: "UPDATE_SECTIONS",
    payload,
  };
};
