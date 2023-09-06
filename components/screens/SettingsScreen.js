import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import Profile from "../profile/Profile";
import CameraApp from "../camera/CameraApp";

const Tab = createBottomTabNavigator();

const SettingsScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraApp}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="camera" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default SettingsScreen;
