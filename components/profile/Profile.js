import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/AuthProvider";
import ApiRailway from "../api/ApiRailway";

const Profile = () => {
  const { accessToken, handleLogout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");

  useEffect(() => {
    fetchUser();
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
  return (
    <View style={styles.profileContainer}>
      {userData && (
        <View style={styles.userContainer}>
          <Text style={styles.userDetailText}>
            {userData.firstname || "First Name"}{" "}
          </Text>
          <Text style={styles.userDetailText}>
            {userData.lastname || "Last Name"}
          </Text>
        </View>
      )}
      <View style={styles.inputFieldsContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="New First Name"
          value={newFirstname}
          onChangeText={setNewFirstname}
        />
        <TextInput
          style={styles.inputField}
          placeholder="New Last Name"
          value={newLastname}
          onChangeText={setNewLastname}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => updateName()}>
          <Text>Update User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => deleteUser()}>
          <Text>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  inputFieldsContainer: {
    gap: 16,
    marginTop: 16,
    width: "100%",
  },
  inputField: {
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f0",
    height: 30,
  },
  buttonContainer: {
    gap: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 44,
    marginBottom: 32,
  },
});

export default Profile;
