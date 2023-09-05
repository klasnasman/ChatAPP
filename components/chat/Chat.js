import React, { useState, useEffect, useContext } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthProvider";
import SendMessage from "./SendMessage";
import ApiRailway from "../api/ApiRailway";

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
      console.error("Error sending message:", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await ApiRailway.deleteMessage(accessToken, messageId);
      fetchMessages(accessToken);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  function createMessagesWithDivider(messages) {
    const messagesWithDivider = [];
    let currentDate = null;

    for (const message of messages) {
      const messageDate = new Date(message.date).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (messageDate !== currentDate) {
        messagesWithDivider.push({ type: "divider", date: messageDate });
        currentDate = messageDate;
      }
      messagesWithDivider.push({ type: "message", message });
    }
    return messagesWithDivider.reverse();
  }

  const renderMessageItem = ({ item }) => {
    if (item.type === "divider") {
      return (
        <View style={styles.dateDividerContainer}>
          <Text style={styles.dateDividerText}>{item.date}</Text>
        </View>
      );
    } else {
      return (
        <Swipeable
          renderRightActions={(dragX) => (
            <View style={styles.deleteButtonContainer}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteMessage(item.message._id)}>
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateX: dragX.interpolate({
                          inputRange: [0, 100],
                          outputRange: [0, 0],
                        }),
                      },
                    ],
                  }}>
                  <Feather name="trash" size={16} color="white" />
                </Animated.View>
              </TouchableOpacity>
            </View>
          )}
          friction={2}
          overshootRight={false}
          overshootFriction={8}
          threshold={600}>
          <View style={styles.messageContainer}>
            <Text
              style={[
                styles.usernameText,
                item.message.user && item.message.user._id === userId
                  ? styles.ownUsernameText
                  : styles.otherUsernameText,
              ]}>
              {item.message.user && item.message.user.username}
            </Text>
            <Text
              style={[
                styles.message,
                item.message.user && item.message.user._id === userId
                  ? styles.ownMessage
                  : styles.otherMessage,
              ]}>
              {item.message.content}
            </Text>
          </View>
        </Swipeable>
      );
    }
  };

  const keyExtractor = (item) =>
    item.type === "divider" ? item.date : item.message._id;

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      enabled={true}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}>
      <View style={styles.container}>
        {userId && (
          <FlatList
            data={createMessagesWithDivider(messages)}
            inverted={true}
            keyExtractor={keyExtractor}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "white",
  },
  dateDividerContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  dateDividerText: {
    textTransform: "lowercase",
    color: "#dededc",
  },
  messageContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sendMessageContainer: {
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
  },
  message: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: "blue",
  },
  usernameText: {
    fontSize: 12,
    textTransform: "lowercase",
  },
  ownMessage: {
    alignSelf: "flex-end",
    color: "white",
    borderColor: "#1982FC",
    backgroundColor: "#1982FC",
  },
  ownUsernameText: {
    display: "none",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f0",
    borderColor: "#f1f1f0",
  },
  otherUsernameText: {
    alignSelf: "flex-start",
    color: "#dededc",
  },
  deleteButtonContainer: {
    alignItems: "center",
    marginTop: "auto",
    marginBottom: "auto",
    paddingRight: 16,
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
