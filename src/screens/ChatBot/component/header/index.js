import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { BgHeader, IconAvatar, IconClose } from "../../../../assets";
import { moderateScale } from "../../../../utils/Scale";

const { width } = Dimensions.get("window");

const Header = () => {
  return (
    <View style={styles.containerHeader}>
      <View
        style={{ position: "absolute", top: Platform.OS === "ios" ? -25 : -30 }}
      >
        <BgHeader height={118} width={width} />
      </View>
      <View style={styles.headerBar}>
        <View>
          <View style={styles.leftHeader}>
            <View style={styles.img}>
              <IconAvatar
                height={moderateScale(19)}
                width={moderateScale(10)}
              />
            </View>
            <View>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Ruri - Chat With Us
              </Text>
              <Text style={{ fontSize: 12, color: "white" }}>Online</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
          <IconClose width={moderateScale(18)} height={moderateScale(18)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containerHeader: {
    height: 85,
    position: "relative"
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 70
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#F36B25",
    position: "relative",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  badge: {
    position: "absolute",
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "lightgreen",
    right: -2
  }
});
