import React, { useEffect, useRef } from "react";

type ClickerProps = {
  internalClick?: () => void;
  externalClick?: () => void;
};

export const Clicker = (props: React.PropsWithChildren<ClickerProps>) => {
  const { internalClick = () => {}, externalClick = () => {} } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      event.stopPropagation();
      if (containerRef.current && event.target) {
        const isInternalClick = containerRef.current.contains(
          event.target as Node
        );
        if (isInternalClick) {
          internalClick();
        } else {
          externalClick();
        }
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [internalClick, externalClick]);

  return <div ref={containerRef}>{props.children}</div>;
};
