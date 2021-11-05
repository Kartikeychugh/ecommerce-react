import { DirectoryReducerAction } from "./directory.types";
import { ISection } from "../../../models";

export const updateSectionsState = (
  payload: ISection[]
): DirectoryReducerAction<"UPDATE_SECTIONS", ISection[]> => {
  return {
    type: "UPDATE_SECTIONS",
    payload,
  };
};
