import React from "react";
import RenderHtml from "react-native-render-html";

import { moderateScale, verticalScale } from "../../../../utils/Scale";
import { Dimensions, Linking, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export const MessageHTML = ({ item, onBubblePress }) => {
  console.log("item html : ", item);
  return (
    <View style={styles.container}>
      <RenderHtml
        source={{ html: item.html ? `${item.html}` : `${item.content}` }}
        contentWidth={width}
        renderersProps={{
          a: {
            onPress: (evt, href) => {
              Linking.openURL(href);
            }
          }
        }}
        tagsStyles={{
          span: { color: "black" },
          h1: { color: "black" },
          h2: { color: "black" },
          h3: { color: "black" },
          h4: { color: "black" },
          h5: { color: "lightgrey" },
          p: { color: "black" },
          ul: { color: "black" },
          li: { color: "black" }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: moderateScale(13),
    padding: moderateScale(10)
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
  text_14_white: {
    fontSize: moderateScale(14),
    color: "white"
  },
  text_10_white: {
    fontSize: moderateScale(10),
    color: "white"
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
