import "./globals.css";
import { Toaster } from "sonner";

import { setAppID } from "@shared/next/library/set-app-id";
import { getAppID } from "@shared/next/library/get-app-id";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel e-COO | CDD",
  description: "Administração para cooperados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setAppID("CDD");

  return (
    <html lang="en">
      <body
        className={`${getAppID()} w-screen font-poppins`}
      >
        <div className="flex flex-row justify-center w-full">
          <Toaster richColors position="top-right" />
          <div className="relative max-w-md w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
