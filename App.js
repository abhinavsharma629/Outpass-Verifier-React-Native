import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import AppBarScreen from "./app/components/AppBarScreen";
import LoginScreen from "./app/components/LoginScreen";

const navigator = createStackNavigator(
  {
    AppBar: AppBarScreen,
    Login: LoginScreen
  },
  {
    initialRouteName: "Login",
    headerMode: 'none',
    navigationOptions: () => ({
      title: 'Login',
    }),
  }
);

export default createAppContainer(navigator);
