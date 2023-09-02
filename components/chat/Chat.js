import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthProvider";
import ApiRailway from "../api/Api";

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

  const renderMessageItem = ({ item }) => {
    return (
      <View>
        <Text>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {userId && (
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={renderMessageItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  messageText: {
    color: "black",
  },
});
