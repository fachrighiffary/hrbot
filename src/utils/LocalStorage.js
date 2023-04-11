import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (name, data) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(data));
  } catch (error) {
    console.log("error saving data ", e);
  }
};

export const getValue = async name => {
  try {
    const data = await AsyncStorage.getItem(name);
    return JSON.parse(data);
  } catch (e) {
    console.log("error getting data ", e);
  }
};

export const removeValue = async name => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (e) {
    console.log("error remove data ", e);
  }
};
