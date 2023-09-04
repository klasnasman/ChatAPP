import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthProvider";
import ApiRailway from "../api/Api";
import SendMessage from "./SendMessage";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const { accessToken, userId } = useContext(AuthContext);

  useEffect(() => {
    fetchMessages(accessToken);
  }, [accessToken]);

  const fetchMessages = async (token) => {
    try {
      const messagesResponse = await ApiRailway.getAllMessages(token);
      const messagesData = messagesResponse.data;
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (messageText) => {
    try {
      await ApiRailway.createMessage(accessToken, messageText);
      fetchMessages(accessToken);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const renderMessageItem = ({ item }) => {
    return (
      <View>
        <Text>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        {userId && (
          <FlatList
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={renderMessageItem}
          />
        )}
      </View>
      <View style={styles.sendMessageContainer}>
        <SendMessage
          onSendMessage={handleSendMessage}
          style={styles.sendMessage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 86,
  },
  messageText: {
    color: "black",
  },
});
