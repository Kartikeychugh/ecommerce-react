import "./directory.styles.scss";

import {
  RootState,
  fetchSectionsAsync,
  selectSections,
} from "../../core/redux";
import { WithFirebaseProps, withFirebase } from "../../core/firebase";

import { Firestore } from "@firebase/firestore";
import { MenuItem } from "./directory-menu-item";
import React from "react";
import { Sections } from "../../models";
import { WithSpinner } from "../with-spinner/with-spinner.component";
import { connect } from "react-redux";

type DirectoryProps = {
  sections: Sections;
  fetchSectionsAsync: (firebaseStore: Firestore | undefined) => void;
} & WithFirebaseProps;

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
      <WithSpinner isLoading={!this.props.sections}>
        <div className="directory-menu">
          {this.props.sections &&
            this.props.sections.map((section) => (
              <MenuItem key={section.id} section={section} />
            ))}
        </div>
      </WithSpinner>
    );
  }

  private fetchSections() {
    this.props.fetchSectionsAsync(this.props.firebaseStore);
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
      fetchSectionsAsync: (firebaseStore: Firestore | undefined) => {
        dispatch(fetchSectionsAsync(firebaseStore));
      },
    };
  }
)(withFirebase(DirectoryInternal));
