import React, { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { encData } from "../../utils/Encrypt";
import {
  Text,
  View,
  Animated,
  Platform,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { moderateScale, verticalScale } from "../../utils/Scale";
import { BASE_URL, postData, REGISTER } from "../../networks";

const { width, height } = Dimensions.get("screen");

const Registrasi = ({ navigation }) => {
  const dispatch = useDispatch();

  const refFirstName = useRef(null);
  const refLastName = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refRePassword = useRef(null);
  const refNoPhone = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState(firstName);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [noPhone, setNoPhone] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [showRepass, setShowRepass] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [alertPass, setAlertPass] = useState(false);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnimReg = React.useRef(new Animated.Value(0)).current;

  const onRegister = async () => {
    var dataPassword = encData(password);
    var params = {
      name: firstName + " " + lastName,
      nickname: firstName,
      email: email,
      phone: noPhone,
      password: dataPassword,
      client: Platform.OS,
      interests: ["modulechatbotmobile"]
    };

    console.log("params : ", params);
    try {
      console.log("API yang di hit => ", BASE_URL + REGISTER);
      let dataHitRegister = await postData(BASE_URL + REGISTER, params);
      console.log("RegisterHit", dataHitRegister);
      Alert.alert("Rgister berhasil");
    } catch (error) {
      console.log(error);
      Alert.alert("Error register");
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentBody}>
        <Text style={styles.title}>Daftar</Text>
        <View style={{ ...styles.row, marginTop: 34 }}>
          <View style={{ flex: 1, marginRight: 11 }}>
            <Text style={styles.text}>Nama Depan</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textInput}
                keyboardType={"default"}
                placeholder="Nama Lengkap"
                ref={refFirstName}
                value={firstName}
                autoCapitalize="none"
                onChangeText={firstName => setFirstName(firstName)}
                onSubmitEditing={() => refFirstName.current.focus()}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Nama Belakang</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textInput}
                value={lastName}
                keyboardType="default"
                ref={refLastName}
                autoCapitalize="none"
                placeholder="Nama Belakang"
                onChangeText={lastName => setLastName(lastName)}
                onSubmitEditing={() => refLastName.current.focus()}
              />
            </View>
          </View>
        </View>
        <View style={{ ...styles.row, marginTop: 24 }}>
          <View style={{ flex: 1, marginRight: 11 }}>
            <Text>Kata Kunci</Text>
            <View
              style={{
                ...styles.inputBox,
                borderWidth: 2,
                borderColor: alertPass ? "red" : "transparent"
              }}
            >
              <TextInput
                style={{ ...styles.textInput, width: 120 }}
                value={password}
                ref={refPassword}
                autoCapitalize="none"
                keyboardType="default"
                placeholder="Kata kunci"
                placeholderTextColor="#a4a1a6"
                onChangeText={password => setPassword(password)}
                onSubmitEditing={() => refRePassword.current.focus()}
                onFocus={() => setAlertPass(false)}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text>Ulangi Kata Kunci</Text>
            <View
              style={{
                ...styles.inputBox,
                borderWidth: 2,
                borderColor: alertPass ? "red" : "transparent"
              }}
            >
              <TextInput
                style={{ ...styles.textInput, width: 120 }}
                value={rePassword}
                ref={refRePassword}
                autoCapitalize="none"
                keyboardType="default"
                placeholder="Kata kunci"
                placeholderTextColor="#a4a1a6"
                onChangeText={rePassword => setRePassword(rePassword)}
                onSubmitEditing={() => refNoPhone.current.focus()}
                onFocus={() => setAlertPass(false)}
              />
            </View>
          </View>
        </View>
        {alertPass
          ? <View style={styles.alertPass}>
              <Danger height={20} width={20} />
              <Text style={{ marginLeft: 10, color: "#BB2924" }}>
                Kata Kunci yang Anda masukkan tidak sama
              </Text>
            </View>
          : null}
        <View style={{ marginTop: 16 }}>
          <Text>Email</Text>
          <View style={{ ...styles.inputBox, width: "100%" }}>
            <TextInput
              style={styles.textInput}
              value={email}
              ref={refEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Alamat Email"
              placeholderTextColor="#a4a1a6"
              onChangeText={email => setEmail(email)}
              onSubmitEditing={() => refPassword.current.focus()}
            />
          </View>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text>Nomor Handphone</Text>
          <View style={{ ...styles.inputBox, width: "100%" }}>
            <View style={styles.flexRow}>
              <View style={styles.contentNoHp}>
                <Text>+62</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={noPhone}
                ref={refNoPhone}
                autoCapitalize="none"
                keyboardType="phone-pad"
                placeholder="Nomor Telepon"
                placeholderTextColor="#a4a1a6"
                onChangeText={noPhone =>
                  setNoPhone(noPhone.replace(/[^0-9]/g, ""))}
                onSubmitEditing={() => onRegister()}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.contentBottom}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btnDaftar}
            onPress={() => onRegister()}
          >
            <Text style={{ color: "#ffff" }}>DAFTAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff"
  },
  contentBody: {
    paddingHorizontal: 32,
    marginTop: 50
  },
  title: {
    fontSize: moderateScale(16),
    color: "grey"
  },
  text: {
    fontSize: moderateScale(11)
  },
  textInput: {
    width: "100%",
    fontSize: moderateScale(12),
    color: "black"
  },
  row: {
    height: 65,
    width: "100%",
    flexDirection: "row"
  },
  inputBox: {
    marginTop: 6,
    height: 46,
    backgroundColor: "#F0F0F0",
    opacity: 0.5,
    borderRadius: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  alertPass: {
    flexDirection: "row",
    marginTop: 10
  },
  checkbox: {
    alignSelf: "center"
  },
  btnDaftar: {
    height: 46,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 26
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  contentNoHp: {
    height: "100%",
    alignItems: "center"
  },
  contentBottom: {
    height: 100,
    paddingHorizontal: 32,
    marginBottom: 20
  }
});

export default Registrasi;
