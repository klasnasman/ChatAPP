import axios from "axios";

const BASE_URL = "https://chat-api-with-auth.up.railway.app";

const ApiRailway = {
  register: async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/token`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllMessages: async (accessToken) => {
    try {
      const response = await axios.get(`${BASE_URL}/messages`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createMessage: async (accessToken, messageText) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/messages`,
        { content: messageText },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteMessage: async (accessToken, messageId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getSpecificUser: async (accessToken) => {
    try {
      const response = await axios.get(`${BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (accessToken) => {
    try {
      const response = await axios.delete(`${BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ApiRailway;
