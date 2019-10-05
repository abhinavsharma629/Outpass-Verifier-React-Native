import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  BackAndroid,
  BackHandler
} from "react-native";
import { AsyncStorage } from "react-native";

import { StackActions, NavigationActions } from "react-navigation";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true
    };
  }
  logout = () => {
    AsyncStorage.clear(); // to clear the token
    BackHandler.exitApp();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.buttonContainer1}>
            <Button onPress={this.logout} title="Logout" />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.avatar}
          source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
        />

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>Jaypee User</Text>
            <Text style={styles.info}>
              Jaypee University Of Engineering And Technology
            </Text>
            <Text style={styles.info1}>
              Scan The Outpasses And Check Their Validity
            </Text>
            <Text style={styles.info1}>
              See The List Of Valid Outpasses For Today
            </Text>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Edit Profile</Text>
            </TouchableOpacity>
            <Text style={styles.instructions}>
              Developer:- Abhinav Sharma{"\n"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#09BFC0",
    height: 200
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  info1: {
    fontSize: 16,
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  },
  buttonContainer1: {
    marginTop: 10,
    marginLeft: 230,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    borderRadius: 30
  },
  instructions: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    marginBottom: 0
  },
  buttonText11: {
    fontSize: 21,
    color: "black"
  }
});
