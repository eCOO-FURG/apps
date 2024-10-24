"use client";

import Footer from "@shared/components/Footer";
import { CycleProvider } from "@shared/context/cycle";

export default function LayoutWithFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CycleProvider>
      <div className="flex flex-col justify-between w-full h-full bg-theme-background">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
        <Footer appID={"CDD"} />
      </div>
    </CycleProvider>
  );
}