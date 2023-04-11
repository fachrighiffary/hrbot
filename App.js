import React from "react";
import Router from "./src/routes/Router";
import store from "./src/redux/store";

import { StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch } from "react-redux";
import { LiveChat } from "./src/utils/HandlerNotification";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
      <LiveChat />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
