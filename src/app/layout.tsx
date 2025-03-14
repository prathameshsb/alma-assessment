"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "@/styles/globalStyles";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
