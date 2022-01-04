import React, { useEffect, useRef, useState } from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

type WithSpinnerPropsType = {
  isLoading: boolean;
  render?: React.ComponentType;
};

type WithSpinnerStateType = {
  waiting: boolean;
};

export const WithSpinner = (
  props: React.PropsWithChildren<WithSpinnerPropsType>
) => {
  const [state, setState] = useState<WithSpinnerStateType>({
    waiting: true,
  });
  const timerRef = useRef<NodeJS.Timer | undefined>(undefined);

  const getLoadingContent = () =>
    state.waiting ? null : (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    );

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setState({ waiting: false });
    }, 500);
    return () => {};
  }, []);

  const { isLoading, children, render: Render } = props;

  if (!isLoading && timerRef.current && state.waiting) {
    clearTimeout(timerRef.current);
  }

  return isLoading ? (
    getLoadingContent()
  ) : Render ? (
    <Render />
  ) : (
    <>{children}</>
  );
};
