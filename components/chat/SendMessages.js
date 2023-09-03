import React, { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

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
        placeholder="Type your message..."
        onChangeText={setMessageText}
        value={messageText}
      />
      <View>
        <Button onPress={handleSendMessage} title="Send" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f1f0",
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "center",
  },
});
