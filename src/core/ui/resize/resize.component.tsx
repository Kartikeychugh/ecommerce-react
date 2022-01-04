import React, { useEffect } from "react";

type ResizeProps = {
  onResize: () => void;
};

export const Resize = (props: React.PropsWithChildren<ResizeProps>) => {
  const { onResize } = props;

  useEffect(() => {
    window.addEventListener("resize", () => onResize());
    return () => {
      window.removeEventListener("resize", () => onResize());
    };
  }, [onResize]);

  return <>{props.children}</>;
};
