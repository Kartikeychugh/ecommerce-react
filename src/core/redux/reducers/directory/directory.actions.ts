import { DirectoryReducerAction } from "./directory.types";
import { ISection } from "../../../../models";

export const fetchSectionSuccess = (
  sections: ISection[]
): DirectoryReducerAction => {
  return {
    type: "FETCH_SECTIONS_SUCCESS",
    payload: sections,
  };
};
