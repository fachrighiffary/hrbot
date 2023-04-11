import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView as Scroll,
  FlatList,
  Platform,
  TouchableOpacity
} from "react-native";
import { moderateScale } from "../../../../utils/Scale";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";

const { height, width } = Dimensions.get("screen");

const MessageDetailProduct = ({ RBSDetailProduct }) => {
  const dataProduct = {
    id: 1,
    name: "Lexy Set Meja Makan",
    carousel: [1, 2, 3, 4, 5]
  };
  return (
    <Modal
      isVisible={false}
      onSwipeComplete={() => {}}
      onBackdropPress={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.containerModal}>
          <View>
            <View style={styles.borderTop} />
          </View>
          <ScrollView>
            <View>
              <FlatList
                horizontal
                contentContainerStyle={{
                  height: 160,
                  marginTop: 16
                }}
                data={dataProduct.carousel}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.bgcCarousel}>
                      <View style={styles.imgCarousel} />
                    </View>
                  );
                }}
              />
            </View>
            <View style={{ marginTop: moderateScale(16) }}>
              <Text style={{ fontSize: moderateScale(24), fontWeight: "bold" }}>
                {dataProduct.name}
              </Text>
              <View style={{ marginTop: 8 }}>
                <Text style={styles.detailDesc}>
                  Detail Produk & Spesifikasi
                </Text>
                <Text style={styles.detailDesc}>Meja dapat dilipat</Text>
                <Text style={styles.detailDesc}>
                  Isi set : 1 meja, 2 bangku
                </Text>
                <Text style={styles.detailDesc}>Material : MDF</Text>
                <Text style={styles.detailDesc}>
                  Finishing : powder coating
                </Text>
                <Text style={styles.detailDesc}>Beban maksimal : 60 kg</Text>
                <Text style={styles.detailDesc}>
                  Dimensi meja terbuka : 90 x 45 x 75 cm
                </Text>
                <Text style={styles.detailDesc}>
                  Dimensi meja tertutup : 90 x 5 x 75 cm
                </Text>
                <Text style={styles.detailDesc}>
                  Dimensi bangku : 33 x 45 x 45 cm
                </Text>
              </View>
              <View style={styles.borderGap} />
              <TouchableOpacity style={styles.btnLihat} activeOpacity={0.6}>
                <Text style={styles.txtLihatPRoduct}>Lihat Produk</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MessageDetailProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  borderTop: {
    height: 8,
    width: 80,
    backgroundColor: "grey",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 8
  },
  containerModal: {
    height: height - 280,
    width: width,
    backgroundColor: "white",
    marginBottom: Platform.OS == "ios" ? -20 : 0,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingHorizontal: moderateScale(16)
  },
  bgcCarousel: {
    marginRight: moderateScale(16),
    padding: moderateScale(8),
    height: moderateScale(147),
    width: moderateScale(237),
    backgroundColor: "white",
    borderRadius: moderateScale(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  imgCarousel: {
    backgroundColor: "lightgrey",
    height: "100%",
    width: "100%",
    borderRadius: moderateScale(8)
  },
  detailDesc: { fontSize: 16, color: "grey" },
  borderGap: {
    marginVertical: moderateScale(24),
    height: 1,
    borderTopColor: "#1A8FDD",
    borderWidth: 0.5
  },
  btnLihat: {
    alignSelf: "center"
  },
  txtLihatPRoduct: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A8FDD"
  }
});
