import "./directory.styles.scss";

import { IFireBaseDirectorySection, ISection, Sections } from "../../models";
import {
  RootState,
  selectSections,
  updateSectionsState,
} from "../../core/redux";
import { getDocs, orderBy } from "@firebase/firestore";

import { MenuItem } from "./directory-menu-item";
import React from "react";
import { connect } from "react-redux";
import { firebaseStore } from "../../core/firebase";

type DirectoryProps = {
  sections: Sections;
  updateSections: (sections: ISection[]) => void;
};

class DirectoryInternal extends React.Component<DirectoryProps> {
  componentDidMount() {
    if (this.props.sections) {
      return;
    }

    this.fetchSections();
  }

  private fetchSections() {
    const q = firebaseStore.query(
      firebaseStore.firebase_getCollectionRef("directory"),
      orderBy("order")
    );

    getDocs(q).then((querySnapshot) => {
      const docs = querySnapshot.docs;
      const sections: ISection[] = [];

      docs.forEach((doc) => {
        const data = doc.data() as IFireBaseDirectorySection;
        const section = { ...data, id: doc.id };
        sections.push(section);
      });

      this.props.updateSections(sections);
    });
  }

  render() {
    return (
      <div className="directory-menu">
        {this.props.sections &&
          this.props.sections.map((section) => (
            <MenuItem key={section.id} section={section} />
          ))}
      </div>
    );
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
