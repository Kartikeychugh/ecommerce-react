import "./popup.styles.scss";

import { Clicker } from "..";
import React from "react";

type PopupProps = {
  position: "right" | "left";
  content: () => JSX.Element;
  open?: boolean;
  width: number;
};

type PopupState = {
  open: boolean;
};

export class Popup extends React.Component<PopupProps, PopupState> {
  private popUpRef: React.RefObject<HTMLDivElement>;
  private targetRef: React.RefObject<HTMLDivElement>;
  private grace = 10;

  constructor(props: PopupProps) {
    super(props);
    this.popUpRef = React.createRef<HTMLDivElement>();
    this.targetRef = React.createRef<HTMLDivElement>();

    this.state = {
      open: false,
    };
  }

  public render() {
    const { children: Target, content: PopUpContent } = this.props;

    return (
      <Clicker
        externalClick={() => {
          this.toggleOpen(false);
        }}>
        <div
          ref={this.targetRef}
          className="target"
          onClick={this.handleTargetClick}>
          {Target}
        </div>
        {this.state.open ? (
          <div
            ref={this.popUpRef}
            className="popup"
            style={{
              ...this.calculatePosition(),
            }}>
            <PopUpContent />
          </div>
        ) : null}
      </Clicker>
    );
  }

  private handleTargetClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.toggleOpen(!this.state.open);
  };

  private calculatePosition() {
    if (!this.targetRef.current) {
      return { left: 0, top: 0 };
    }

    const targetLeft = this.targetRef.current.offsetLeft;
    const targetWidth = this.targetRef.current.offsetWidth;
    const targetTop = this.targetRef.current.offsetTop;
    const targetHeight = this.targetRef.current.offsetHeight;
    const popUpWidth = this.props.width;
    const windowRightEdge = window.innerWidth - this.grace;
    const windowLeftEdge = this.grace;

    let newX = targetLeft;
    let newY = targetTop + targetHeight;
    let shift = 0;

    if (this.props.position === "right") {
      newX = targetLeft;
      const rightEdge = targetLeft + targetWidth + popUpWidth;
      shift = rightEdge - windowRightEdge > 0 ? rightEdge - windowRightEdge : 0;
    } else if (this.props.position === "left") {
      newX = targetLeft + targetWidth - popUpWidth;
      const leftEdge = newX;
      shift = windowLeftEdge - leftEdge > 0 ? windowLeftEdge - leftEdge : 0;
    }

    return { left: newX - shift, top: newY };
  }

  private toggleOpen(open: boolean) {
    this.setState({ open });
  }
}
