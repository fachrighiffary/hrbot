import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";

import { Platform } from "react-native";
import { getValue, saveData } from "./AsyncStorage";

export const checkPermission = async () => {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    getFcmToken();
  } else {
    requestUserPermission();
  }
};

async function getFcmToken() {
  let fcm_token = await getValue("FCM_TOKEN");

  if (fcm_token == null || fcm_token == "" || fcm_token == undefined) {
    let fcmToken = await messaging().getToken();
    // let fcmToken;
    console.log("Ini adlaah fcm token dari file firebase : ", fcmToken);

    Platform.OS === "ios"
      ? saveData("FCM_TOKEN", fcmToken)
      : PushNotification.configure({
          onRegister: function(token) {
            fcmToken = token.token;
            console.log("Ini adlaah fcm token : ", fcmToken);
            if (fcmToken) {
              saveData("FCM_TOKEN", fcmToken);
            } else {
              console.log("Not getFcmToken App");
            }
          }
        });
  } else {
    console.log("FCM Token : ", fcm_token);
    console.log("else getFcmToken in local ");
  }
}

async function requestUserPermission() {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    console.log("User has notification permissions enabled.");
  } else if (
    authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    console.log("User has provisional notification permissions.");
  } else {
    console.log("User has notification permissions disabled");
  }
}
