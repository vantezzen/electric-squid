import React from "react";

function Button({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <button
      className={`${
        className ?? ""
      } bg-slate-900 text-white p-3 rounded w-full`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
