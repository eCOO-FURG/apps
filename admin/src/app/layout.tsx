import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

import ClientValidation from "@shared/components/ClientValidation";
import { addOrganizationNameToTitle } from "@shared/library/get-metadata";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: addOrganizationNameToTitle("Painel Admin"),
  description: "Administração para cooperados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${process.env.APP_ID} w-screen h-screen font-poppins bg-theme-background`}
      >
        <div className="flex flex-row justify-center w-full h-inherit">
          <Toaster richColors position="top-right" />
          <div className="relative w-full h-inherit flex flex-row">
            <Sidebar />
            <ClientValidation>
              <div className="w-full h-full p-15">{children}</div>
            </ClientValidation>
          </div>
        </div>
      </body>
    </html>
  );
}
