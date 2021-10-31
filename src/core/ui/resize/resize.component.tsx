import React from "react";

type ResizeProps = {
  onResize: () => void;
};

export class Resize extends React.Component<
  React.PropsWithChildren<ResizeProps>,
  {}
> {
  public componentDidMount() {
    window.addEventListener("resize", this.triggerChange);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.triggerChange);
  }

  private triggerChange = () => {
    this.props.onResize();
  };

  public render() {
    return this.props.children;
  }
}
