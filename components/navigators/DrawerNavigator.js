import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthProvider";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Chat from "../chat/Chat";

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
    screens.push(<Drawer.Screen key="Chat" name="Chat" component={Chat} />);
  } else {
    screens.push(
      <Drawer.Screen key="Login" name="Sign In" component={Login} />,
      <Drawer.Screen
        key="Register"
        name="Create Account"
        component={Register}
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0000",
    height: 44,
  },
  signOutButtonText: {
    color: "#fff",
  },
});

export default DrawerNavigator;
