import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function SendMessage({ onSendMessage }) {
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText("");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        onChangeText={setMessageText}
        value={messageText}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
        <Feather name="send" size={24} color="#1982FC" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 30,
    backgroundColor: "#f1f1f0",
    borderRadius: 15,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "center",
  },
});
