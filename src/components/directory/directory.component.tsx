import React from "react";
import { fetchDirectoryData } from "../../fake-server";
import { ISection } from "../../models";
import { MenuItem } from "../menu-item";
import "./directory.styles.scss";

type DirectoryProps = {};
type DirectoryState = {
  sections: ISection[];
};

export class Directory extends React.Component<DirectoryProps, DirectoryState> {
  constructor(props: DirectoryProps) {
    super(props);

    this.state = {
      sections: [],
    };
  }

  public componentDidMount() {
    const sections = fetchDirectoryData();
    this.setState({ sections });
  }

  public render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map((section) => (
          <MenuItem key={section.id} section={section} />
        ))}
      </div>
    );
  }
}
