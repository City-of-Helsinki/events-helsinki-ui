import React from "react";

interface Props {
  as: "div" | "p";
  className?: string;
  text: string;
}

const TextWithLineBreaks: React.FC<Props> = ({ as: Tag, className, text }) => {
  return (
    <Tag className={className}>
      {text.split("\n").map((item, key, parts) => {
        return (
          <React.Fragment key={key}>
            {item}
            {key < parts.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </Tag>
  );
};

export default TextWithLineBreaks;
