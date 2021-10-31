import React from "react";

type ResizeProps = {
  content: React.ComponentType;
};

export class Resize extends React.Component<
  React.PropsWithChildren<ResizeProps>,
  {}
> {
  constructor(props: React.PropsWithChildren<ResizeProps>) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    window.addEventListener("resize", this.triggerChange);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.triggerChange);
  }

  public shouldComponentUpdate() {
    return true;
  }
  private triggerChange = () => {
    this.setState({});
  };

  public render() {
    const { content: Content } = this.props;
    return <Content />;
  }
}
