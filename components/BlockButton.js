import React from "react";
import { useSlate } from "slate-react";

import CustomEditor from "@/services/slateEditor";

export default function BlockButton({ icon, format }) {
  const editor = useSlate();

  return (
    <button
      className="hover:text-white text-white/40 transition-colors"
      onClick={(e) => {
        e.preventDefault();
        CustomEditor.toggleBlock(editor, format);
      }}
    >
      {icon}
    </button>
  );
}
