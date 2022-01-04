import "./directory.styles.scss";

import React, { useEffect } from "react";
import { RootState, selectSections } from "../../core/redux";

import { FirebaseActions } from "../../core/redux/reducers/firebase/firebase.actions";
import { MenuItem } from "./directory-menu-item";
import { Sections } from "../../models";
import { WithSpinner } from "../with-spinner/with-spinner.component";
import { connect } from "react-redux";

type DirectoryProps = {
  sections: Sections;
  fetchSectionsAsync: () => void;
};

const DirectoryInternal = (props: DirectoryProps) => {
  const { sections, fetchSectionsAsync } = props;

  useEffect(() => {
    if (sections) {
      return;
    }

    fetchSectionsAsync();
    return () => {};
  }, [sections, fetchSectionsAsync]);

  return (
    <WithSpinner
      isLoading={!props.sections}
      render={() => (
        <div className="directory-menu">
          {props.sections!.map((section) => (
            <MenuItem key={section.id} section={section} />
          ))}
        </div>
      )}
    />
  );
};

export const Directory = connect(
  (state: RootState) => {
    return {
      sections: selectSections(state),
    };
  },
  (dispatch: any) => {
    return {
      fetchSectionsAsync: FirebaseActions(dispatch).fetchSections,
    };
  }
)(DirectoryInternal);
