import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={() => navigation.navigate("CHATBOT")}>
        <Text>GOTO CHAT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
