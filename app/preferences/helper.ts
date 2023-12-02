import AsyncStorage from '@react-native-async-storage/async-storage';

export const setPref = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    return false;
  }
};

export const getPref = async (key: any) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (e) {
    return false;
  }
};

export const logout = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    return false;
  }
};
