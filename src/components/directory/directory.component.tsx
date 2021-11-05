import "./directory.styles.scss";

import { DocumentData, QueryDocumentSnapshot, query } from "firebase/firestore";
import { ISection, Sections } from "../../models";
import {
  RootState,
  selectSections,
  updateSectionsState,
} from "../../core/redux";
import { collection, getDocs, orderBy } from "@firebase/firestore";

import { MenuItem } from "./directory-menu-item";
import React from "react";
import { WithSpinner } from "../with-spinner/with-spinner.component";
import { connect } from "react-redux";
import { store } from "../../core/firebase";

type DirectoryProps = {
  sections: Sections;
  updateSections: (sections: ISection[]) => void;
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
    getDocs(query(collection(store, "directory"), orderBy("order")))
      .then((querySnapshot) => {
        const docs = querySnapshot.docs;
        const res: { [key: string]: any } = {};

        docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          res[doc.id] = data;
        });
        return res;
      })
      .then((res) => {
        const sections: ISection[] = [];

        Object.keys(res).forEach((key) => {
          const section = { ...res[key], id: key };
          sections.push(section);
        });

        this.props.updateSections(sections);
      });
  }
}

export const Directory = connect(
  (state: RootState) => {
    return {
      sections: selectSections(state),
    };
  },
  (dispatch) => {
    return {
      updateSections: (sections: ISection[]) => {
        dispatch(updateSectionsState(sections));
      },
    };
  }
)(DirectoryInternal);
