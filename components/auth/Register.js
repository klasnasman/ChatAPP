import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import ApiRailway from "../api/api";

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegisterPress = async () => {
    try {
      await ApiRailway.register(username, password);
      console.log("Registration Successful");
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
      <TouchableOpacity onPress={() => handleRegisterPress()}>
        <Text>Create Account</Text>
      </TouchableOpacity>
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
