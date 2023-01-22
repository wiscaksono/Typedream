import React from "react";

export default function Toolbar({ children }) {
  return (
    <div className="py-[15px] border-y border-white/10 flex gap-2.5 mb-[30px]">
      {children}
    </div>
  );
}
