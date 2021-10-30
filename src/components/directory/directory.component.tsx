import "./directory.styles.scss";

import { ISection } from "../../models";
import { MenuItem } from "./directory-menu-item";
import React from "react";
import { fetchDirectoryData } from "../../fake-server";

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

  public shouldComponentUpdate(
    _nextProps: DirectoryProps,
    nextState: DirectoryState
  ) {
    return nextState !== this.state;
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
