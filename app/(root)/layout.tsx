import StreamVideoProvider from "@/components/StreamClientProvider";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
