import React from "react";

export default function Leaf({ attributes, children, leaf }) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.highlight) {
    return (
      <span
        {...attributes}
        {...(leaf.highlight && { "data-cy": "search-highlighted" })}
        className="bg-[#333]"
      >
        {children}
      </span>
    );
  }

  return <span {...attributes}>{children}</span>;
}
