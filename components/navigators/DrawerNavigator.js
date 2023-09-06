import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthProvider";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Chat from "../chat/Chat";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ accessToken, handleLogout, ...props }) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.footer}>
        {accessToken && (
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => handleLogout()}>
            <Feather name="log-out" size={24} color="#fff" />
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const DrawerNavigator = () => {
  const { accessToken, handleLogout } = useContext(AuthContext);

  const screens = [];

  if (accessToken) {
    screens.push(
      <Drawer.Screen
        key="Chat"
        name="Chat"
        component={Chat}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="message-circle" size={size} color={color} />
          ),
        }}
      />,
      <Drawer.Screen
        key="Settings"
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    );
  } else {
    screens.push(
      <Drawer.Screen
        key="Login"
        name="Sign In"
        component={Login}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="log-in" size={size} color={color} />
          ),
        }}
      />,
      <Drawer.Screen
        key="Register"
        name="Create Account"
        component={Register}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user-plus" size={size} color={color} />
          ),
        }}
      />
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
          accessToken={accessToken}
          handleLogout={handleLogout}
          {...props}
        />
      )}>
      {screens}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0000",
    borderRadius: 22,
    height: 44,
    paddingVertical: 10,
  },
  signOutButtonText: {
    marginLeft: 8,
    color: "#fff",
  },
});

export default DrawerNavigator;
