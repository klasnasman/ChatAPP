import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
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
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <View style={styles.welcome}>
      <View style={styles.logo}>
        <Feather name="smile" size={60} color="#59c639" />
      </View>
      <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}>
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
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => handleLoginPress()}>
          <Feather name="log-in" size={24} color="#fff999" />
          <Text style={styles.signOutButtonText}>Sign In</Text>
        </TouchableOpacity>

        <Text
          style={styles.linkText}
          onPress={() => {
            setUsername("");
            setPassword("");
            setErrorMessage("");
            navigation.navigate("Create Account");
          }}>
          Don't have an account? Register here
        </Text>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  welcome: {
    flex: 1,
    position: "relative",
  },
  logo: {
    position: "absolute",
    top: 56,
    right: "50%",
    transform: [{ translateX: 30 }],
    zIndex: "999",
  },
  input: {
    width: "100%",
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f0",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1982FC",
    borderRadius: 22,
    height: 44,
    paddingVertical: 10,
    marginBottom: 16,
    width: "100%",
    paddingVertical: 10,
  },
  signOutButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#fff",
  },
});
