import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { StyleSheet, View, Button } from "react-native";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  HeaderBackButton
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import ScannerScreen from "./ScannerScreen";
import OutpassScreen from "./OutpassScreen";
import ListScreen from "./ListScreen";
import ProfileScreen from "./ProfileScreen";

const AppBarScreen = createMaterialBottomTabNavigator(
  {
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: () => (
          <View>
            <Icon size={25} name={"ios-person"} color="#FFF" />
          </View>
        ),
        headerLeft: (
          <HeaderBackButton onPress={() => navigation.goBack(null)} />
        ),
        gesturesEnabled: true,
        tabBarColor: "#3F51B5"
      }
    },
    scanner: {
      screen: ScannerScreen,
      navigationOptions: {
        tabBarLabel: "Scanner",
        tabBarIcon: () => (
          <View>
            <Icon size={25} name={"ios-barcode"} color="#FFF" />
          </View>
        ),
        headerLeft: (
          <HeaderBackButton onPress={() => navigation.goBack(null)} />
        ),
        gesturesEnabled: true,
        tabBarColor: "#009688"
      }
    },
    list: {
      screen: ListScreen,
      navigationOptions: {
        tabBarLabel: "List",
        tabBarIcon: () => (
          <View>
            <Icon size={25} name={"ios-list"} color="#FFF" />
          </View>
        ),
        headerLeft: (
          <HeaderBackButton onPress={() => navigation.goBack(null)} />
        ),
        gesturesEnabled: true,
        tabBarColor: "#795548"
      }
    }
  },
  {
    initialRouteName: "scanner",
    activeColor: "#f0edf6",
    inactiveColor: "#3e2465",
    animationEnabled: true,
    barStyle: { backgroundColor: "rgb(0,122,255)" }
  }
);

export default AppBarScreen;
