import React from "react";
import { moderateScale, verticalScale } from "../../../../utils/Scale";
import { Dimensions, Image, StyleSheet, View } from "react-native";
const { width } = Dimensions.get("window");

export const MessageImage = ({ item, onBubblePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image style={styles.img} source={{ uri: item.originalContentUrl }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey"
  },
  containerImg: {
    height: verticalScale(300),
    width: width - moderateScale(30),
    borderRadius: 10
  },
  img: {
    height: verticalScale(300),
    width: width - moderateScale(30),
    resizeMode: "stretch",
    borderRadius: 10
  },
  view_ic_arrow_left: {
    position: "absolute",
    left: moderateScale(20),
    alignContent: "center"
  },
  ic_arrow_left: {
    width: moderateScale(24),
    height: moderateScale(24)
  },
  text_12: {
    fontSize: moderateScale(12),
    color: "#8D8F92"
  },
  text_14_black: {
    fontSize: moderateScale(14),
    color: "#000"
  },
  text_10_black: {
    fontSize: moderateScale(10),
    color: "#000"
  },

  message_from_me: {
    alignSelf: "flex-start",
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(8),
    backgroundColor: "#f1f1f3",
    borderTopLeftRadius: moderateScale(13),
    borderTopRightRadius: moderateScale(13),
    borderBottomLeftRadius: moderateScale(13),
    borderBottomRightRadius: moderateScale(13)
  },
  arrowLeft: {
    left: moderateScale(0, 0.5),
    bottom: -10,
    position: "absolute"
  }
});
