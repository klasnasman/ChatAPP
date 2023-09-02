import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleLogin = async (token, userId) => {
    try {
      await AsyncStorage.setItem("accessToken", token);
      await AsyncStorage.setItem("_id", userId);
      setAccessToken(token);
      setUserId(userId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setAccessToken(null);
    } catch (error) {
      console.log(error);
    }
  };

  const isLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      setAccessToken(token);
      if (token) {
        const userId = await AsyncStorage.getItem("_id");
        setUserId(userId);
        console.log("AuthProvider userId:", userId);
        console.log("AuthProvider accessToken:", token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        userId,
        handleLogin,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
