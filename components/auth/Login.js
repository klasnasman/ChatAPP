import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../context/AuthProvider";
import ApiRailway from "../api/ApiRailway";

export default function Login({ navigation }) {
  const { handleLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginPress = async () => {
    try {
      const response = await ApiRailway.login(username, password);
      const accessToken = response.data.accessToken;
      const userId = response.data._id;
      handleLogin(accessToken, userId);
      console.log("login.js - accesstoken:", accessToken);
      console.log("login.js - userId:", userId);
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity onPress={() => handleLoginPress()}>
        <Text>Sign In</Text>
      </TouchableOpacity>

      <Text
        onPress={() => {
          setUsername("");
          setPassword("");
          setErrorMessage("");
          navigation.navigate("Create Account");
        }}>
        Don't have an account? Register here
      </Text>
      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: "white",
  },
  input: {
    width: "100%",
    backgroundColor: "grey",
  },
});
