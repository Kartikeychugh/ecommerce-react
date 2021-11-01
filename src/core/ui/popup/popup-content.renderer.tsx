import React from "react";

type PopupContentRendererProps = {
  left: number;
  top: number;
  content: () => JSX.Element;
};

export const PopupContentRenderer = React.forwardRef(
  (
    props: PopupContentRendererProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const { content: PopUpContent } = props;
    return (
      <div
        ref={ref}
        className="popup"
        style={{
          left: props.left,
          top: props.top,
        }}>
        <PopUpContent />
      </div>
    );
  }
);
