import React from "react";

function PageHeader({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold text-center mb-3">{children}</h1>;
}

export default PageHeader;
