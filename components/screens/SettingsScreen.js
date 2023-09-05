import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../profile/Profile";

const Tab = createBottomTabNavigator();

const SettingsScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default SettingsScreen;
