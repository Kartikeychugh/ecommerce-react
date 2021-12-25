import "./directory.styles.scss";

import { RootState, selectSections } from "../../core/redux";

import { FirebaseActions } from "../../core/redux/reducers/firebase/firebase.actions";
import { MenuItem } from "./directory-menu-item";
import React from "react";
import { Sections } from "../../models";
import { WithSpinner } from "../with-spinner/with-spinner.component";
import { connect } from "react-redux";

type DirectoryProps = {
  sections: Sections;
  fetchSectionsAsync: () => void;
};

type DirectoryState = {};
class DirectoryInternal extends React.Component<
  DirectoryProps,
  DirectoryState
> {
  public componentDidMount() {
    if (this.props.sections) {
      return;
    }

    this.fetchSections();
  }

  public render() {
    return (
      <WithSpinner
        isLoading={!this.props.sections}
        render={() => (
          <div className="directory-menu">
            {this.props.sections!.map((section) => (
              <MenuItem key={section.id} section={section} />
            ))}
          </div>
        )}
      />
    );
  }

  private fetchSections() {
    this.props.fetchSectionsAsync();
  }
}

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
