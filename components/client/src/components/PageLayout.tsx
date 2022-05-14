import React from "react";

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="rounded-lg bg-white p-10 text-slate-900 w-2/3">
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
