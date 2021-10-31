import React from "react";

type ClickerProps = {
  internalClick?: () => void;
  externalClick?: () => void;
};

type ClickerState = {};

export class Clicker extends React.Component<
  React.PropsWithChildren<ClickerProps>,
  ClickerState
> {
  containerRef: React.RefObject<HTMLDivElement>;
  constructor(props: ClickerProps) {
    super(props);
    this.state = {};
    this.containerRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClick);
  }

  public render() {
    return <div ref={this.containerRef}>{this.props.children}</div>;
  }

  handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (this.containerRef.current && event.target) {
      const { internalClick = () => {}, externalClick = () => {} } = this.props;
      const isInternalClick = this.containerRef.current.contains(
        event.target as Node
      );
      if (isInternalClick) {
        internalClick();
      } else {
        externalClick();
      }
    }
  };
}
