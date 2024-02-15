import React from "react";
import { AuthProvider } from "./AuthContext";
import Navigation from "./components/navigation";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["ViewPropTypes will be removed"]);

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
