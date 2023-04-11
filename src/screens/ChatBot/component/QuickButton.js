import React from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const QuickButton = ({ dataQuickButton, sendMessage }) => {
  renderQuickButton = ({ item }) => {
    if (dataQuickButton.length == 0) {
      return null;
    } else {
      return (
        <TouchableOpacity onPress={() => sendMessage(item)} style={styles.btn}>
          <View>
            <Text style={styles.txt}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <FlatList
      style={styles.quickbuttonContainer}
      data={dataQuickButton}
      horizontal
      renderItem={renderQuickButton}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  quickbuttonContainer: {
    backgroundColor: "transparent"
  },
  btn: {
    borderColor: "#007AFF",
    margin: 5,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 20,
    minWidth: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },
  txt: {
    color: "black",
    paddingTop: 5,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12
  }
});
