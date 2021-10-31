import "./popup.styles.scss";

import React from "react";
import { debouncer } from "../../../utils";

type PopupProps = {
  position: "right" | "left";
  content: () => JSX.Element;
  open?: boolean;
};

type PopupState = {
  popUpOpen: boolean;
  x: number;
  y: number;
  corrected: boolean;
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
      popUpOpen: false,
      x: 0,
      y: 0,
      corrected: true,
    };
  }

  public componentDidMount() {
    window.addEventListener("resize", debouncer(this.handleSize, 50));
    window.addEventListener("click", this.handleOutsideClick);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.handleSize);
    window.removeEventListener("click", this.handleOutsideClick);
  }

  private handleSize = () => {
    if (!this.popUpRef.current) {
      return;
    }

    this.setState((prevState) => {
      return { ...prevState, corrected: false };
    });
  };

  private handleOutsideClick = (e: MouseEvent) => {
    console.log("triggered");

    if (!this.popUpRef.current) {
      return;
    }

    if (this.targetRef.current?.contains(e.target as any)) {
      return;
    }

    if (this.popUpRef.current.contains(e.target as any)) {
      return;
    }

    this.changeOpenState(false);
  };

  public render() {
    const { children, content: Content } = this.props;
    const { popUpOpen } = this.state;

    return (
      <>
        <div
          ref={this.targetRef}
          className="target"
          onClick={(event: React.SyntheticEvent<HTMLDivElement>) => {
            event.stopPropagation();
            this.changeOpenState(!popUpOpen);
          }}>
          {children}
        </div>
        {this.state.popUpOpen ? (
          <div
            ref={this.popUpRef}
            className="popup"
            style={{
              left: this.state.x,
              top: this.state.y,
            }}>
            <Content />
          </div>
        ) : null}
      </>
    );
  }

  public componentDidUpdate() {
    if (this.state.corrected) {
      return;
    }

    this.correctPopUpPlacement();
  }

  public shouldComponentUpdate(_nextProps: PopupProps, nextState: PopupState) {
    return (
      nextState.popUpOpen !== this.state.popUpOpen ||
      nextState.corrected !== this.state.corrected
    );
  }

  private changeOpenState(popUpOpen: boolean) {
    this.setState((prevState) => {
      return {
        ...prevState,
        popUpOpen,
        x: 0,
        y: 0,
        corrected: popUpOpen ? false : true,
      };
    });
  }

  private correctPopUpPlacement() {
    if (!this.targetRef.current || !this.popUpRef.current) {
      return;
    }
    const targetLeft = this.targetRef.current.offsetLeft;
    const targetWidth = this.targetRef.current.offsetWidth;
    const targetTop = this.targetRef.current.offsetTop;
    const targetHeight = this.targetRef.current.offsetHeight;
    const popUpWidth = this.popUpRef.current.offsetWidth;
    const windowRightEdge = window.innerWidth - this.grace;
    const windowLeftEdge = this.grace;

    let newX = targetLeft;
    let newY = targetTop + targetHeight;
    let shift = 0;

    if (this.props.position === "right") {
      newX = targetLeft + targetWidth;
      const rightEdge = targetLeft + targetWidth + popUpWidth;
      shift = rightEdge - windowRightEdge > 0 ? rightEdge - windowRightEdge : 0;
    } else if (this.props.position === "left") {
      newX = targetLeft - popUpWidth;
      const leftEdge = newX;
      shift = windowLeftEdge - leftEdge > 0 ? windowLeftEdge - leftEdge : 0;
    }

    this.setState((prevState) => ({
      ...prevState,
      x: newX - shift,
      y: newY,
      corrected: true,
    }));
  }
}
