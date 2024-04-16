import React from "react";
import { Metadata } from "next";

import StreamVideoProvider from "@/components/StreamClientProvider";

export const metadata: Metadata = {
  title: "Zoom-Clone",
  description: "Zoom clone by Hade21",
  icons: {
    icon: "/icons/logo.svg",
  },
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
