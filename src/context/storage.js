import AsyncStorage from "@react-native-community/async-storage";

export default {
  getItem: async (key) => {
    const result = await AsyncStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  },
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return "Saved in DB";
  },
  removeItem: (key) => AsyncStorage.removeItem(key),
};