import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ApiRailway from "../api/ApiRailway";

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegisterPress = async () => {
    try {
      await ApiRailway.register(username, password);
      navigation.navigate("Sign In");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(
          "Username already taken. Please choose a different one."
        );
        setUsername("");
        setPassword("");
      } else {
        console.error("Registration Error:", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      enabled={true}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}>
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
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => handleRegisterPress()}>
          <Feather name="user-plus" size={24} color="#fff999" />
          <Text style={styles.signOutButtonText}>Create Account</Text>
        </TouchableOpacity>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
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
