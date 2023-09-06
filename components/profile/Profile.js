import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthProvider";
import ApiRailway from "../api/ApiRailway";
import { Feather } from "@expo/vector-icons";

const Profile = () => {
  const { accessToken, handleLogout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    fetchUser();
    checkMediaLibraryPermission();
  }, []);

  const fetchUser = async () => {
    try {
      const fetchedUserData = await ApiRailway.getSpecificUser(accessToken);
      setUserData(fetchedUserData.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const updateName = async () => {
    try {
      const newData = {
        firstname: newFirstname,
        lastname: newLastname,
      };

      const updatedUser = {
        ...userData,
        ...newData,
      };

      setUserData(updatedUser);
      inputRef.current.blur();
      console.log(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async () => {
    try {
      await ApiRailway.deleteUser(accessToken);
      Alert.alert("Account Deleted", "Your account has been deleted.");
      handleLogout();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const checkMediaLibraryPermission = async () => {
    const mediaLibraryPermission = await MediaLibrary.getPermissionsAsync();
    if (mediaLibraryPermission.granted) {
      setHasMediaPermission(true);
    } else {
      setHasMediaPermission(false);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error in pickImage function:", error);
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileContainerInner}>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require("../../assets/placeholder.png")}
              style={styles.profileImage}
            />
          )}
          <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
            <Feather name="plus-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {userData && (
          <View style={styles.inputFieldsContainer}>
            <TextInput
              style={[
                styles.inputField,
                !userData.firstname && { color: "black" },
              ]}
              placeholder={
                userData.firstname ? userData.firstname : "Add First Name"
              }
              value={newFirstname}
              onChangeText={setNewFirstname}
              ref={inputRef}
              placeholderTextColor={"gray"}
            />
            <TextInput
              style={[
                styles.inputField,
                !userData.lastname && { color: "black" },
              ]}
              placeholder={
                userData.lastname ? userData.lastname : "Add First Name"
              }
              value={newLastname}
              onChangeText={setNewLastname}
              ref={inputRef}
              placeholderTextColor={"gray"}
            />
          </View>
        )}
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={120}
        enabled={true}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.blueButton, styles.button, styles.halfWidth]}
            onPress={() => updateName()}>
            <Feather name="user-check" size={24} color="white" />
            <Text style={styles.signOutButtonText}>Update User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.redButton, styles.button, styles.halfWidth]}
            onPress={() => deleteUser()}>
            <Feather name="user-minus" size={24} color="white" />
            <Text style={styles.signOutButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "white",
  },
  profileContainerInner: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  pickImageButton: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    left: "50%",
    transform: [{ translateX: 20 }],
    borderRadius: 50,
    backgroundColor: "#f1f1f0",
    overflow: "hidden",
  },
  userContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#EDEDED",
  },
  inputFieldsContainer: {
    gap: 16,
    marginTop: 16,
    width: "100%",
  },
  inputField: {
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f0",
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    borderColor: "#EDEDED",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    borderWidth: 1,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#ddd",
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    gap: 8,
  },
  halfWidth: {
    flex: 1,
    width: "50%",
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flexWrap: "nowrap",
    borderRadius: 22,
    height: 44,
    marginBottom: 32,
  },
  redButton: {
    backgroundColor: "#FF0000",
  },
  blueButton: {
    backgroundColor: "#1982FC",
  },
  signOutButtonText: {
    color: "#fff",
  },
});

export default Profile;
