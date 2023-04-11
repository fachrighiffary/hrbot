import React, { useState, useRef, useEffect } from "react";
import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import messaging from "@react-native-firebase/messaging";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { Platform, View } from "react-native";
import { checkPermission } from "./FireBase";
import { saveData } from "./AsyncStorage";
import { pushDataChats, ratingChat } from "../redux/actions/chat";
import { getRatingType } from "../networks";

export const LiveChat = (data, ref) => {
  const [permissions, setPermissions] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("App =>", "");
    checkPermission();
    createDefaultChannels();
    configure();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("A new FCM message arrived", remoteMessage);
      if (remoteMessage.data.category == "inbox") {
        localNotification(remoteMessage);
      } else if (remoteMessage.data.category == "chat") {
        sendToMessage(remoteMessage.data.message);
        liveChatNotification(remoteMessage);
      } else {
        localNotification(remoteMessage);
      }
    });
    return unsubscribe;

    // Check whether an initial notification is available
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        console.log("onNotificationOpenedApp : ", remoteMessage);
      }
    );

    return unsubscribe;
  }, []);

  messaging().setBackgroundMessageHandler(remoteMessage => {
    console.log("background handler remote notification : ", remoteMessage);
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
  });

  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        "Notification caused app to open from quit state:",
        remoteMessage.notification
      );
    }
  });

   const sendToMessage = async data => {
    var obj = JSON.parse(data);
    const handleRating = obj[0].text.split("/");
    if (handleRating.length > 1) {
      const newUrl = handleRating.join("/").split(":\n")[1];
      const newParam = newUrl.split("/").slice(-2).join("/");
      try {
        await getRatingType(newParam)
          .then(res => {
            console.log("response get rating : ", res.data);
            dispatch(ratingChat({ ...res.data, showRating: true }));
          })
          .catch(err => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("masuk livechat");
      let value = {
        ...obj[0],
        time: moment().format("hh:mm A")
      };
      dispatch(pushDataChats(value));
    }
  };

  return <View />;
};

const configure = onNotification => {
  PushNotification.configure({
    onRegister: function(token) {
      //process token
      console.log("Register notification : ", token.token);
      Platform.OS === "android" ? saveData("FCM_TOKEN", token.token) : null;
    },
    onNotification: onNotification,
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    popInitialNotification: true,
    requestPermissions: true
  });
};

const createDefaultChannels = () => {
  PushNotification.createChannel(
    {
      channelId: "default-channel-id", // (required)
      channelName: `Default channel`, // (required)
      channelDescription: "A default channel", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => {
      // console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    }
  );
  PushNotification.createChannel(
    {
      channelId: "sound-channel-id", // (required)
      channelName: `Sound channel`, // (required)
      channelDescription: "A sound channel", // (optional) default: undefined.
      soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => {
      // console.log(`createChannel 'sound-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    }
  );
};

const liveChatNotification = remoteMessage => {
  const data = JSON.parse(remoteMessage.notification.body)[0];
  PushNotification.localNotification({
    channelId: "default-channel-id",
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    color: "black",
    soundName: "default",
    alertAction: "view", // (optional) default: view
    category: "Notification", // (optional) default: null

    title: "Live Agent",
    message: data.text,
    bigText: data.text,
    subText: data.text,
    bigPictureUrl:
      Platform.OS === "ios"
        ? remoteMessage.data.fcm_options.image
        : remoteMessage.notification.android.imageUrl,
    // bigPictureUrl: remoteMessage.android.imageUrl,

    vibration: 300,
    autoCancel: false,
    vibrate: true,
    playSound: true,
    actions: null,
    userInfo: {}, // (optional) default: null (object containing additional notification data)
    number: 1
  });
};

const localNotification = remoteMessage => {
  console.log("remoteMessage : ", JSON.parse(remoteMessage.notification.body));
  PushNotification.localNotification({
    channelId: "default-channel-id",
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    color: "black",
    soundName: "default",
    alertAction: "view", // (optional) default: view
    category: "Notification", // (optional) default: null

    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
    bigText: remoteMessage.notification.title,
    subText: remoteMessage.notification.body,
    bigPictureUrl:
      Platform.OS === "ios"
        ? remoteMessage.data.fcm_options.image
        : remoteMessage.notification.android.imageUrl,
    // bigPictureUrl: remoteMessage.android.imageUrl,

    vibration: 300,
    autoCancel: false,
    vibrate: true,
    playSound: true,
    actions: null,
    userInfo: {}, // (optional) default: null (object containing additional notification data)
    number: 1
  });
};

const cancelAll = () => {
  PushNotification.cancelAllLocalNotifications();
};

export { configure, localNotification, cancelAll };
