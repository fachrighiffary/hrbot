import React from "react";

import { moderateScale, verticalScale } from "../../../../utils/Scale";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export const MessageCarousel = ({ item, onTextPress, onInformasiProduct }) => {
  const newData = [{ key: "left-item" }, ...item.columns];

  const renderCard = ({ item }) => {
    if (item.key === "left-item") {
      // return <View style={styles.leftSpacer} />;
    } else {
      return (
        <View style={styles.containerBubble}>
          <View style={styles.containerImage}>
            <View style={{ ...styles.img, backgroundColor: "lightgrey" }}>
              <Image
                style={styles.img}
                source={{ uri: item.thumbnailImageUrl }}
              />
            </View>
          </View>
          {item.title
            ? <View style={styles.contentText}>
                <Text style={styles.txtStyle}>
                  {item.title.split("<br>")}
                </Text>

                <Text style={styles.txtStyle2}>
                  {item.text.split("<br>")}
                </Text>
              </View>
            : null}
          <View style={styles.containerBtn}>
            {item.actions.map((dataActions, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (dataActions.label === "Spesifikasi Produk") {
                      onInformasiProduct(dataActions);
                    } else {
                      onTextPress(dataActions);
                    }
                  }}
                  transparent
                  style={styles.btnCarousel}
                >
                  <Text key={index.toString()} style={styles.btnTxtCarousel}>
                    {dataActions.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={newData}
        horizontal={true}
        renderItem={renderCard}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(10),
    marginTop: verticalScale(3)
  },
  containerBubble: {
    minHeight: 201,
    width: moderateScale(163),
    paddingTop: 5,
    borderRadius: 8,
    marginBottom: moderateScale(8),
    marginEnd: moderateScale(8),
    backgroundColor: "white",
    shadowColor: "#000"
  },
  containerImage: {
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    height: verticalScale(100),
    // width: moderateScale(143),
    width: "100%",
    overflow: "hidden",
    paddingHorizontal: moderateScale(4)
  },
  leftSpacer: {
    width: 40,
    height: 50
  },
  img: {
    height: "100%",
    width: undefined,
    resizeMode: "cover",
    borderRadius: 8
  },
  contentText: {
    width: "100%",
    marginTop: verticalScale(8),
    minHeight: 10
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
  arrowLeft: {
    left: moderateScale(0, 0.5),
    bottom: -10,
    position: "absolute"
  },
  txtStyle: {
    marginHorizontal: moderateScale(10),
    fontSize: moderateScale(12),
    fontWeight: "bold",
    color: "black"
  },
  txtStyle2: {
    marginHorizontal: moderateScale(10),
    fontSize: moderateScale(10),
    textAlign: "left"
  },
  containerBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(8),
    width: "100%",
    minHeight: 30
  },
  btnCarousel: {
    borderTopWidth: 0.5,
    borderTopColor: "#bfbaba",
    minHeight: verticalScale(20),
    marginBottom: verticalScale(5),
    width: "95%",
    justifyContent: "center"
  },
  btnTxtCarousel: {
    color: "#1A8FDD",
    justifyContent: "center",
    textAlign: "center",
    fontSize: moderateScale(12),
    fontWeight: "bold"
  }
});
