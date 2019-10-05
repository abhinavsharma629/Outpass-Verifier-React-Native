import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Linking,
  Vibration,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView,
  RefreshControl
} from "react-native";
import {
  Container,
  Title,
  Content,
  Footer,
  Toast,
  FooterTab,
  Left,
  Right,
  Body,
  Icon
} from "native-base";

import { Header } from "react-native-elements";

import OutpassScreen1 from "./OutpassScreen1";

import Camera from "react-native-camera";

import QRCodeScanner from "react-native-qrcode-scanner";

import DropdownAlert from "react-native-dropdownalert";

import { withNavigationFocus } from "react-navigation";

import { ActivityIndicator, Colors } from "react-native-paper";

class ScannerScreen extends Component {
  constructor() {
    super();

    this.state = {
      scanning: true,
      showMarker: true,
      closeInterval: 3000,
      code: "",
      loading: true,
      outpassData: {},
      focusedScreen: true,
      refreshing: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () =>
      this.setState({ focusedScreen: true, loading:false })
    );
    navigation.addListener("willBlur", () =>
      this.setState({ focusedScreen: false, loading: false })
    );


  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false, focusedScreen: true });
    }, 1000);
  };

  onSuccess = e => {
    console.log("Successful Scan");
    console.log(e.data);
    var scan = !this.state.scanning;
    fetch(
      "https://arcane-spire-87935.herokuapp.com/student/verifyHash?hashedCode=" +
        e.data,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === "200") {
          this.dropDownAlertRef.alertWithType(
            "success",
            "Success",
            "Outpass Has Been Verified By The Warden!!."
          );
          var data = JSON.parse(responseJson.data);
          console.log(data);
          this.setState(
            {
              outpassData: data,
              scanning: false
            },
            () => console.log(this.state.outpassData)
          );
        } else {
          this.setState(
            {
              outpassData: {}
            },
            () => console.log(this.state)
          );
          this.dropDownAlertRef.alertWithType(
            "error",
            "Error",
            "Outpass Not Approved By Warden."
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  reRendered = () => {
    var scan = !this.state.scanning;
    this.setState(
      {
        scanning: scan
      },
      () => console.log(this.state)
    );

    this.dropDownAlertRef.alertWithType(
      "success",
      "Success",
      "Successfully Re Rendered."
    );
  };

  render() {



    if (!this.state.focusedScreen) {
      return null;
    } else {
      if (this.state.loading) {
        return (
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader}
            hidesWhenStopped
            color={Colors.blue800}
          />
        );
      } else {
        if (this.state.scanning) {
          return (
            <ScrollView
              contentContainerStyle={styles.container}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            >
              <View style={{ width: "100%" }}>
                <DropdownAlert
                  ref={ref => (this.dropDownAlertRef = ref)}
                  closeInterval={this.state.closeInterval}
                />
              </View>
              <Text style={styles.welcome} />
              <Header
                leftComponent={{ icon: "camera", color: "#fff", top: -10 }}
                centerComponent={{
                  text: "Scan Validity Of The Outpass",
                  style: {
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                    top: -10,
                    fontStyle: "italic"
                  }
                }}
                containerStyle={{
                  backgroundColor: "#3D6DCC",
                  height: 50,
                  width: 420,
                  top: -47
                }}
              />
              <View style={styles.rectangleContainer}>
                <QRCodeScanner
                  style={styles.camera}
                  onRead={this.onSuccess}
                  showMarker={this.state.showMarker}
                  reactivate={true}
                  reactivateTimeout={1000}
                  cameraStyle={{
                    height: 280,
                    marginTop: 20,
                    width: 350,
                    alignSelf: "center",
                    justifyContent: "center"
                  }}
                  bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                      <Button style={styles.buttonText} title="Scanning..." />
                    </TouchableOpacity>
                  }
                >
                  <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle} />
                  </View>
                </QRCodeScanner>
              </View>
              <Text style={styles.instructions}>
                Developer:- Abhinav Sharma{"\n"}
              </Text>
            </ScrollView>
          );
        } else {
          return (
            <View>
              <View style={{ width: "100%" }}>
                <DropdownAlert
                  ref={ref => (this.dropDownAlertRef = ref)}
                  closeInterval={this.state.closeInterval}
                />
              </View>
              <ScrollView>
                <OutpassScreen1 data={this.state.outpassData} />
                <TouchableOpacity style={styles.buttonTouchable}>
                  <Button
                    style={styles.buttonText}
                    onPress={this.reRendered}
                    title="New Scan"
                  />
                </TouchableOpacity>
                <Text style={styles.instructions}>
                  Developer:- Abhinav Sharma{"\n"}
                </Text>
              </ScrollView>
            </View>
          );
        }
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  camera: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: Dimensions.get("window").width,
    width: Dimensions.get("window").width
  },

  welcome: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: 250,
    width: 270,
    borderWidth: 2,
    borderColor: "#00FF00",
    backgroundColor: "transparent"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  },
  loader: {
    alignItems: "center",
    justifyContent: "center",
    top: "48%"
  }
});

export default ScannerScreen;
