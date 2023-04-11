import React from "react";
import moment from "moment";

import { MessageCarousel } from "../messageType/MessageCarousel";
import { MessageHTML } from "../messageType/MessageHTML";
import { MessageImage } from "../messageType/MessageImage";
import { MessageSummary } from "../messageType/MessageSummary";
import { MessageText } from "../messageType/MessageText";
import { MessageWeather } from "../messageType/MessageWeather";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { moderateScale, verticalScale } from "../../../../utils/Scale";

const { width } = Dimensions.get("window");

export const MessageFromBot = ({
  item,
  onActionCarousel,
  onActionImage,
  navigation
}) => {
  const flatListRef = React.useRef();
  item.time = moment().format("HH:mm");
  var chat_lenght = 0;
  item.map(data => {
    chat_lenght++;
  });

  const renderChat = data => {
    switch (data.item.type) {
      case "text":
        return (
          <MessageText
            item={data.item}
            onBubblePress={value => onPressMessageFromMe(value)}
            index={data.index}
            lenght={chat_lenght}
          />
        );
      case "carousel":
        return (
          <MessageCarousel
            item={data.item}
            index={data.index}
            lenght={chat_lenght}
            onTextPress={value => onActionCarousel(value)}
          />
        );
      case "laporan":
        return navigation.navigate("MessageLaporan");
      case "image":
        return <MessageImage item={data.item} />;
      case "html":
        return <MessageHTML item={data.item} />;
      case "weather":
        return <MessageWeather item={data.item} />;
      case "summary":
        return <MessageSummary item={data.item} />;
      default:
        return false;
    }
  };

  // return <MessageText item={item}></MessageText>;
  return (
    <View style={{ marginTop: verticalScale(45) }}>
      <FlatList
        ref={flatListRef}
        data={item}
        renderItem={renderChat}
        keyExtractor={(item, key) => key.toString()}
        showsVerticalScrollIndicator={false}
        animated={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1"
  },
  content: {
    flex: 1
  },
  view_compose: {
    position: "absolute",
    width: width - moderateScale(32),
    bottom: moderateScale(5),
    left: moderateScale(16),
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    height: verticalScale(50),
    borderRadius: moderateScale(50),
    alignItems: "center"
  },
  ic_plus: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: "stretch"
  },
  ic_mic: {
    height: moderateScale(20),
    width: moderateScale(15),
    resizeMode: "stretch"
  },
  ic_send: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: "stretch"
  },
  touch_plus: {
    marginHorizontal: moderateScale(10)
  },
  touch_mic: {
    marginHorizontal: moderateScale(10),
    backgroundColor: "#E74F22",
    height: moderateScale(45),
    width: moderateScale(45),
    borderRadius: moderateScale(50),
    justifyContent: "center",
    alignItems: "center"
  },
  toolbar: {
    justifyContent: "center",
    height: 56,
    width: width
  },
  textToolbar: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    color: "#046571",
    textAlign: "center"
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
    fontFamily: "Montserrat-Regular",
    fontSize: moderateScale(12),
    color: "#7C7C7C"
  },
  text_12_bold: {
    fontFamily: "Montserrat-Bold",
    fontSize: moderateScale(12),
    color: "#7C7C7C"
  },
  text_14_white: {
    fontFamily: "Montserrat-Regular",
    fontSize: moderateScale(14),
    color: "#000000"
  },
  text_9: {
    fontFamily: "Montserrat-Regular",
    fontSize: moderateScale(9),
    color: "#AAAAAA"
  },
  list: {
    // height: Dimensions.get('window').height - 250,
    backgroundColor: "#F1F1F1"
  }
});
