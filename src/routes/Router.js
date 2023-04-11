import React from "react";
import Login from "../screens/Login";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import ChatBot from "../screens/ChatBot";
import { useSelector } from "react-redux";
import Registrasi from "../screens/Registrasi";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

const Router = () => {
  const isLogin = useSelector(state => state.login.isLogin);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {!isLogin
          ? (
            <>
              <Stack.Screen name="LOGIN" component={Login} />
              <Stack.Screen name="REGISTRASI" component={Registrasi} />
            </>
          )
          :<>
          <Stack.Screen name="HOME" component={Home} />
          <Stack.Screen name="CHATBOT" component={ChatBot} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
