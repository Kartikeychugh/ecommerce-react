import "./popup.styles.scss";

import { Clicker } from "..";
import React from "react";
import { Resize } from "../resize";

type PopupProps = {
  position: "right" | "left";
  content: () => JSX.Element;
  open?: boolean;
  width: number;
};

type PopupState = {
  open: boolean;
  left: number;
  top: number;
  targetLeft: number;
  targetWidth: number;
  targetTop: number;
  targetHeight: number;
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
      left: 0,
      top: 0,
      targetLeft: 0,
      targetWidth: 0,
      targetTop: 0,
      targetHeight: 0,
    };
  }

  public render() {
    const { children: Target, content: PopUpContent } = this.props;

    return (
      <Resize onResize={this.onResize}>
        <Clicker externalClick={this.onExternalClick}>
          <div
            ref={this.targetRef}
            className="target"
            onClick={this.onTargetClick}>
            {Target}
          </div>
          {this.getOpen() && this.targetRef.current ? (
            <div
              ref={this.popUpRef}
              className="popup"
              style={{
                ...this.calculatePopupPosition(),
              }}>
              <PopUpContent />
            </div>
          ) : null}
        </Clicker>
      </Resize>
    );
  }

  public componentDidMount() {
    this.updateTargetPosition();
  }

  private onResize = () => {
    this.updateTargetPosition();
  };

  private onTargetClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.toggleOpen(!this.getOpen());
  };

  private onExternalClick = () => {
    this.toggleOpen(false);
  };

  private calculatePopupPosition() {
    const { targetLeft, targetTop, targetHeight, targetWidth } = this.state;
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
    if (this.props.open !== undefined) {
      return;
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        open,
      };
    });
  }

  private updateTargetPosition() {
    if (!this.targetRef.current) {
      return;
    }

    const targetLeft = this.targetRef.current.offsetLeft;
    const targetWidth = this.targetRef.current.offsetWidth;
    const targetTop = this.targetRef.current.offsetTop;
    const targetHeight = this.targetRef.current.offsetHeight;

    this.setState((prevState) => {
      return {
        ...prevState,
        targetLeft,
        targetWidth,
        targetTop,
        targetHeight,
      };
    });
  }

  private getOpen() {
    if (this.props.open === undefined) {
      return this.state.open;
    }

    return this.props.open;
  }
}
