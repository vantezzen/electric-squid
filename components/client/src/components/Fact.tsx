import React from "react";

function Fact({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <p className="mb-3">
      {title}:<span className="font-bold ml-3">{children}</span>
    </p>
  );
}

export default Fact;
