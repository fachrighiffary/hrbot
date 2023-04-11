import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL, LOGIN, LOGIN_NEW, postData } from "../../networks";
import { encData } from "../../utils/Encrypt";
import { useDispatch } from "react-redux";
import { getValue, saveData } from "../../utils/LocalStorage";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  onDataInputUserLogin1,
  onDataInputUserLogin2
} from "../../redux/actions/login";
import { Logo } from "../../assets";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegister = () => {
    navigation.navigate("REGISTRASI");
  };

  const onSubmit = async () => {
    let fcm = await getValue("FCM_TOKEN");
    console.log(fcm);
    var dataPassword = encData(password);
    // var params = {
    //   email: email,
    //   password: dataPassword,
    //   fcm_token: fcm,
    //   client: Platform.OS
    // };

    const params = {
      name: name,
      nickname: name,
      email: email,
      fcm_token: fcm,
      integration_id: ""
    };
    console.log("data login yang dikirim : ", params);
    try {
      setLoading(true);
      let res = await postData(LOGIN_NEW, params);
      console.log("Response Login : ", res);
      setLoading(false);
      const data = {
        access_token: res.data.cred,
        data: {
          email: res.data.email,
          id: res.data.id
        }
      };
      if (res.success === true) {
        saveData("WAS_LOGIN", true);
        saveData("DATA_LOGIN", data);
        dispatch(onDataInputUserLogin2(data));
        dispatch(onDataInputUserLogin1(true));
        setLoading(false);
      } else {
        Alert.alert(res.error.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("ERROR => ", error);
      setLoading(false);
      Alert.alert("Server Error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={Logo} style={styles.imgLogo} />
      </View>
      <View style={styles.boxLogin}>
        <View>
          <Text>Name</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ color: "black" }}
              placeholder="Name"
              onChangeText={text => setName(text)}
            />
          </View>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text>Email</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ color: "black" }}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={text => setEmail(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.btnLogin}
          onPress={() => {
            onSubmit();
          }}
        >
          {loading
            ? <ActivityIndicator size={"large"} color={"white"} />
            : <Text style={styles.txtWhite}>Login</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.btnLogin}
          onPress={() => {
            onRegister();
          }}
        >
          <Text style={styles.txtWhite}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  imgLogo: {
    height: 140,
    width: 140,
    marginBottom: 24
  },
  boxLogin: {
    width: 343,
    borderRadius: 12,
    backgroundColor: "lightgrey",
    padding: 12
  },
  textInput: {
    marginTop: 8,
    borderRadius: 12,
    height: 40,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 8
  },
  btnLogin: {
    height: 40,
    width: 160,
    backgroundColor: "grey",
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  txtWhite: {
    color: "white"
  }
});
