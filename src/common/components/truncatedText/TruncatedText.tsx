import React from "react";

interface Props {
  as?: "div" | "p" | "span";
  className?: string;
  maxLength?: number;
  text: string;
}

const TruncatedText: React.FC<Props> = ({
  as: Tag = "div",
  className,
  maxLength = 120,
  text
}) => {
  return (
    <Tag className={className}>
      {text.length > maxLength ? `${text.substr(0, maxLength)}...` : text}
    </Tag>
  );
};

export default TruncatedText;
