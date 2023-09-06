import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./components/context/AuthProvider";
import DrawerNavigator from "./components/navigators/DrawerNavigator";
import { navigationRef } from "./components/navigators/RootNavigation";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <DrawerNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
