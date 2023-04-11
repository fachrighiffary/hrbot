import React from "react";
import { moderateScale } from "../../../../utils/Scale";
import { Image, StyleSheet, Text, View } from "react-native";

export const MessageWeather = ({ item }) => {
  const renderWeather = item => {
    return item.columns.map((dataWeather, index) => {
      if (index != 0) {
        return (
          <View key={index} style={styles.container}>
            <Text style={styles.shortDate}>
              {dataWeather.shortDate}
            </Text>
            <Text style={styles.titledetailsWeather}>Siang</Text>
            <View style={styles.contentImg}>
              <Image
                style={styles.img}
                source={{ uri: dataWeather.dayIconUrl }}
              />
            </View>
            <Text style={styles.txtTemperature}>
              {dataWeather.minTemperature}
              {"\u00B0"} - {dataWeather.maxTemperature}
              {"\u00B0"}
            </Text>
            <Text style={styles.titledetailsWeather}>Malam</Text>
            <View style={styles.contentImageNight}>
              <Image
                style={styles.imgNight}
                source={{ uri: dataWeather.nightIconUrl }}
              />
            </View>
            <Text style={styles.txtMinTemperature}>
              {dataWeather.minTemperature}
              {"\u00B0"} - {dataWeather.maxTemperature}
              {"\u00B0"}
            </Text>
          </View>
        );
      }
    });
  };
  return (
    <View style={styles.containerBubble}>
      <Text style={styles.txtCountry}>
        {item.area} {", "}
        {item.countryCode}
      </Text>
      <Text style={styles.txtLongDate}>
        {item.columns[0].longDate}
      </Text>

      <View style={styles.contentRow}>
        <View style={styles.container}>
          <Text style={styles.titledetailsWeather}>Siang</Text>
          <View style={styles.contentImgNoon}>
            <Image
              style={styles.imgNoon}
              source={{ uri: item.columns[0].dayIconUrl }}
            />
            <Text numberOfLines={2} style={styles.txtDay}>
              {item.columns[0].dayWeather == ""
                ? "-"
                : item.columns[0].dayWeather}
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.titledetailsWeather}>Suhu</Text>
          <Text style={styles.txtSuhu25}>
            {item.columns[0].temperature}
            {"\u00B0"}
          </Text>
          <View style={styles.contentRow}>
            <Text style={styles.txtSuhu}>
              Min {item.columns[0].minTemperature}
              {"\u00B0"}
            </Text>
          </View>

          <View style={styles.contentRow}>
            <Text style={styles.txtMax}>
              Maks {item.columns[0].maxTemperature}
              {"\u00B0"}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.titledetailsWeather}>Malam</Text>
          <View style={styles.contentMalam}>
            <Image
              style={styles.imgMalam}
              source={{ uri: item.columns[0].nightIconUrl }}
            />
            <Text numberOfLines={2} style={styles.txtNightWeater}>
              {item.columns[0].nightWeather}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.containerRenderWeather} />
      <View style={styles.contentRow}>
        {renderWeather(item)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  shortDate: { color: "#fff", fontSize: 10, textAlign: "center" },
  contentImg: { justifyContent: "center", alignItems: "center" },
  txtTemperature: {
    flex: 1,
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    marginBottom: 20
  },
  img: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  contentImageNight: { justifyContent: "center", alignItems: "center" },
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
  titledetailsWeather: {
    color: "#ffe700",
    fontSize: 10,
    textAlign: "center"
  },
  imgNight: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  txtMinTemperature: {
    flex: 1,
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    marginBottom: 10
  },
  containerBubble: {
    padding: 14,
    backgroundColor: "#0087d3",
    margin: 10,
    borderRadius: 7
  },
  txtCountry: { fontSize: 20, color: "#fff" },
  txtLongDate: { fontSize: 12, color: "#fff" },
  contentRow: {
    flexDirection: "row",
    marginTop: 10
  },
  contentImgNoon: {
    justifyContent: "center",
    alignItems: "center"
  },
  imgNoon: {
    width: 37,
    height: 37,
    justifyContent: "center",
    alignItems: "center"
  },
  txtDay: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center"
  },
  txtSuhu: {
    flex: 1,
    color: "#fff",
    fontSize: 12,
    textAlign: "center"
  },
  txtSuhu25: { color: "#fff", textAlign: "center", fontSize: 25 },
  contentRow: { flexDirection: "row" },
  txtMax: {
    flex: 1,
    color: "#fff",
    fontSize: 12,
    textAlign: "center"
  },
  contentMalam: {
    justifyContent: "center",
    alignItems: "center"
  },
  imgMalam: {
    width: 37,
    height: 37,
    justifyContent: "center",
    alignItems: "center"
  },
  txtNightWeater: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center"
  },
  containerRenderWeather: {
    backgroundColor: "#fff",
    height: 1,
    marginVertical: 10
  }
});
