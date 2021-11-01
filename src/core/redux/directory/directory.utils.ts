import { DirectoryData } from "../../../assests/data";
import { DirectoryReducerStateManagers } from "./directory.types";

export const fetchSections: DirectoryReducerStateManagers = (
  state,
  _payload
) => {
  return { ...state, sections: DirectoryData };
};
