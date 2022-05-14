import React from "react";

function SubText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-sm text-slate-500 ${className ?? ""}`}>
      {children}
    </div>
  );
}

export default SubText;
