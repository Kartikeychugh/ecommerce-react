import { RootState } from "../../";
import { createSelector } from "reselect";

const selectDirectory = (state: RootState) => state.directory;

export const selectSections = createSelector(
  [selectDirectory],
  (directory: RootState["directory"]) => {
    return directory.sections;
  }
);
