import "./directory.styles.scss";

import { RootState, selectSections } from "../../core/redux";

import { ISection } from "../../models";
import { MenuItem } from "./directory-menu-item";
import { connect } from "react-redux";

type DirectoryProps = { sections?: ISection[] };

const DirectoryInternal = (props: DirectoryProps) => {
  return (
    <div className="directory-menu">
      {props.sections &&
        props.sections.map((section) => (
          <MenuItem key={section.id} section={section} />
        ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    sections: selectSections(state),
  };
};

export const Directory = connect(mapStateToProps)(DirectoryInternal);
