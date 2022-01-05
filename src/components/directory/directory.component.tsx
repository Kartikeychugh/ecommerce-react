import "./directory.styles.scss";

import { RootState, selectSections, useFirebaseAction } from "../../core/redux";

import { MenuItem } from "./directory-menu-item";
import { WithSpinner } from "../with-spinner/with-spinner.component";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const Directory = () => {
  const sections = useSelector((state: RootState) => selectSections(state));
  const { fetchSections } = useFirebaseAction();

  useEffect(() => {
    if (sections) {
      return;
    }

    fetchSections();
    return () => {};
  }, [sections, fetchSections]);

  return (
    <WithSpinner
      isLoading={!sections}
      render={() => (
        <div className="directory-menu">
          {sections!.map((section) => (
            <MenuItem key={section.id} section={section} />
          ))}
        </div>
      )}
    />
  );
};
