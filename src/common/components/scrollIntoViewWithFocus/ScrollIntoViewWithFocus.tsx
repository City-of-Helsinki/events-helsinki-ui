import React from "react";

interface Props {
  children: React.ReactNode;
  isFocused: boolean;
}

const ScrollIntoViewWithFocus: React.FC<Props> = ({ children, isFocused }) => {
  const selfRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (isFocused && selfRef.current && selfRef.current.scrollIntoView) {
      selfRef.current.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }, [isFocused]);

  return <div ref={selfRef}>{children}</div>;
};

export default ScrollIntoViewWithFocus;
