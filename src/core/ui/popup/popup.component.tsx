import "./popup.styles.scss";

import React from "react";

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
    window.addEventListener("resize", this.handleSize);
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

    this.placePopUp(false);
  };

  public render() {
    const { children, content: Content } = this.props;
    return (
      <>
        <div
          ref={this.targetRef}
          className="target"
          onClick={(event: React.SyntheticEvent<HTMLDivElement>) => {
            event.stopPropagation();
            this.placePopUp(!this.openStatus());
          }}>
          {children}
        </div>
        {this.openStatus() ? (
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
    this.placePopUp(this.openStatus());
  }

  private placePopUp(popUpOpen: boolean) {
    if (!this.targetRef.current) {
      return;
    }
    const targetLeft = this.targetRef.current.offsetLeft;
    const targetWidth = this.targetRef.current.offsetWidth;
    const targetTop = this.targetRef.current.offsetTop;
    const targetHeight = this.targetRef.current.offsetHeight;

    if (!this.state.corrected) {
      if (!this.popUpRef.current) {
        return;
      }

      const popUpWidth = this.popUpRef.current.offsetWidth;
      const windowRightEdge = window.innerWidth - this.grace;
      const windowLeftEdge = this.grace;

      let newX = targetLeft;
      let newY = targetTop + targetHeight;
      let shift = 0;

      if (this.props.position === "right") {
        newX = targetLeft + targetWidth;
        const rightEdge = targetLeft + targetWidth + popUpWidth;
        shift =
          rightEdge - windowRightEdge > 0 ? rightEdge - windowRightEdge : 0;
      } else if (this.props.position === "left") {
        newX = targetLeft - popUpWidth;
        const leftEdge = newX;
        shift = windowLeftEdge - leftEdge > 0 ? windowLeftEdge - leftEdge : 0;
      }

      this.setState({
        popUpOpen: popUpOpen,
        x: newX - shift,
        y: newY,
        corrected: true,
      });
    } else {
      if (popUpOpen === this.openStatus()) {
        return;
      }

      const x = 0;
      const y = 0;

      this.setState((prevState) => {
        return {
          ...prevState,
          popUpOpen,
          x,
          y,
          corrected: popUpOpen ? false : true,
        };
      });
    }
  }

  private openStatus = () => {
    if (this.props.open === undefined) {
      return this.state.popUpOpen;
    }

    return this.props.open;
  };
}
