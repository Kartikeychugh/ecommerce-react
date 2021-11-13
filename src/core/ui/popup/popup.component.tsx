import "./popup.styles.scss";

import { Clicker } from "..";
import { PopupContentRenderer } from "./popup-content.renderer";
import React from "react";
import { Resize } from "../resize";

type PopupProps = {
  position: "right" | "left";
  content: () => JSX.Element;
  onClick?: () => void;
  onClose?: () => void;
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
          <div ref={this.targetRef} onClick={this.onTargetClick}>
            {Target}
          </div>
          {this.getOpenStatus() && this.targetRef.current ? (
            <PopupContentRenderer
              {...this.calculatePopupPosition()}
              ref={this.popUpRef}
              content={PopUpContent}
            />
          ) : null}
        </Clicker>
      </Resize>
    );
  }

  public componentDidMount() {
    this.updateTargetPosition();
  }

  private changeOpenStatus(openStatus: boolean) {
    if (this.getOpenStatus() === openStatus) {
      return;
    }

    if (openStatus) {
      this.onOpen();
    } else {
      this.onClose();
    }
  }

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

  private updateTargetPosition() {
    if (!this.targetRef.current) {
      return;
    }

    const targetLeft = this.targetRef.current.offsetLeft;
    const targetWidth = this.targetRef.current.offsetWidth;
    const targetTop = this.targetRef.current.offsetTop;
    const targetHeight = this.targetRef.current.offsetHeight;

    console.log("Updating state:", "popup");

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

  private onOpen = () => {
    if (this.props.open !== undefined) {
      if (this.props.onClick) {
        this.props.onClick();
      }
      return;
    }

    console.log("Updating state:", "popup");

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          open: true,
        };
      },
      () => {
        if (this.props.onClick) {
          this.props.onClick();
        }
      }
    );
  };

  private onClose = () => {
    if (this.props.open !== undefined) {
      if (this.props.onClose) {
        this.props.onClose();
      }
      return;
    }

    console.log("Updating state:", "popup");

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          open: false,
        };
      },
      () => {
        if (this.props.onClose) {
          this.props.onClose();
        }
      }
    );
  };

  private getOpenStatus() {
    if (this.props.open === undefined) {
      return this.state.open;
    }

    return this.props.open;
  }

  private onResize = () => {
    this.updateTargetPosition();
  };

  private onTargetClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.changeOpenStatus(!this.getOpenStatus());
  };

  private onExternalClick = () => {
    this.changeOpenStatus(false);
  };
}
