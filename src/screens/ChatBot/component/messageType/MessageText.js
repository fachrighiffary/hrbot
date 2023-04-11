import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "../../../../utils/Scale";
import { IconAvatar } from "../../../../assets";

export const MessageText = ({ item, onBubblePress }) => {
  return (
    <View style={styles.containerBubble}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <View style={styles.boxAvatar}>
          <IconAvatar height={moderateScale(15)} width={moderateScale(10)} />
        </View>
        <View>
          <Text style={styles.txtNameBot}>Ruri</Text>
          <Text style={styles.txtDescBot}>Ruparupa Assisten Pribadimu</Text>
        </View>
      </View>
      <View style={styles.contentImg}>
        <View>
          <View style={styles.message_from_me}>
            <Text style={styles.text_12_black}>
              {item.text}
            </Text>
            <View style={styles.arrowChat} />
          </View>
          <Text
            style={[
              styles.text_10_black,
              { textAlign: "left", marginTop: verticalScale(4) }
            ]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  text_12_black: {
    fontSize: moderateScale(12),
    color: "black"
  },
  text_10_black: {
    marginLeft: 10,
    fontSize: moderateScale(10),
    color: "black"
  },

  message_from_me: {
    marginLeft: 10,
    alignSelf: "flex-start",
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(8),
    backgroundColor: "white",
    borderRadius: moderateScale(8)
  },
  arrowLeft: {
    left: moderateScale(0, 0.5),
    bottom: -10,
    position: "absolute"
  },
  containerBubble: {
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(7.5),
    width: moderateScale(234)
  },
  contentImg: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: moderateScale(6)
  },
  boxAvatar: {
    backgroundColor: "#F36B25",
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16
  },
  arrowChat: {
    height: 15,
    width: 15,
    borderRadius: 3,
    backgroundColor: "white",
    position: "absolute",
    top: 8,
    left: -5,
    transform: [{ rotate: "45deg" }]
  },
  txtNameBot: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "bold",
    color: "black"
  },
  txtDescBot: {
    marginLeft: 8,
    fontSize: moderateScale(8),
    color: "grey"
  }
});
