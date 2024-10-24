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
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        <div className="h-[var(--footer-height)]">
          <Footer appID={"PRODUCER"} />
        </div>
      </div>
    </CycleProvider>
  );
}