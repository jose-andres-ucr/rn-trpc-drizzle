import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { TRPCProvider } from "../utils/api";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  return (
    <TRPCProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#015b96",
          },
          headerTitleStyle: {
            color: "white",
          },
          contentStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      />
      <StatusBar />
    </TRPCProvider>
  );
}
