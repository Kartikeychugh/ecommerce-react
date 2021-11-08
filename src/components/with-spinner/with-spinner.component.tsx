import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

import React from "react";

type WithSpinnerPropsType = {
  isLoading: boolean;
};

type WithSpinnerStateType = {
  waiting: boolean;
};

export class WithSpinner extends React.Component<
  WithSpinnerPropsType,
  WithSpinnerStateType
> {
  private timer: NodeJS.Timer | undefined;

  constructor(props: WithSpinnerPropsType) {
    super(props);

    this.state = {
      waiting: true,
    };
  }

  public componentDidMount() {
    this.timer = setTimeout(() => {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.setState({ waiting: false }, () => {
        if (this.props.isLoading) {
          console.log("Spinner: Showing spinner now");
        }
      });
    }, 0);
  }

  public render() {
    const { isLoading, children } = this.props;

    if (!isLoading && this.timer && this.state.waiting) {
      console.log("Spinner: Stopped in between");
      clearTimeout(this.timer);
    }

    return isLoading ? this.getLoadingContent() : children;
  }

  private getLoadingContent = () =>
    this.state.waiting ? null : (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    );
}
