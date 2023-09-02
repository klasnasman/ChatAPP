import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./components/context/AuthProvider";
import DrawerNavigator from "./components/navigators/DrawerNavigator";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
