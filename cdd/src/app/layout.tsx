import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { setAppID } from "@shared/next/library/set-app-id";
import { getAppID } from "@shared/next/library/get-app-id";
import ClientValidation from "@shared/components/ClientValidation";

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
    <html lang="pt-BR">
      <body className={`${getAppID()} w-full font-poppins`}>
        <div className="flex flex-row justify-center w-full h-full">
          <Toaster richColors position="top-right" />
          <div className="relative max-w-md w-full h-full">
            <ClientValidation>{children}</ClientValidation>
          </div>
        </div>
      </body>
    </html>
  );
}
