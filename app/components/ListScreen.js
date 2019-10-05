import React from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Linking,
  Vibration,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  AsyncStorage
} from "react-native";

import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem,
  Footer,
  FooterTab
} from "native-base";

import DropdownAlert from "react-native-dropdownalert";
import { ActivityIndicator, Colors } from "react-native-paper";
import ListDetails from "./ListDetails";

export default class ListScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      todaysList: [],
      loading: true,
      loaded: false,
      closeInterval: 1000,
      refreshing: false
    };
  }

  renderData = () => {
    if (this.state.loaded === false) {
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      if (month < 10) {
        var month1 = "0" + month;
      } else {
        var month1 = month;
      }
      var year = date.getFullYear();
      //console.log(date);
      var makeDate = year + "-" + month1 + "-" + day;

      console.log(makeDate);
      fetch(
        "https://arcane-spire-87935.herokuapp.com/student/todaysList?currentDate=" +
          makeDate,
        {
          method: "GET"
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson.status === "200") {
            this.setState(
              {
                todaysList: JSON.parse(responseJson.outpassList),
                loaded: true,
                loading: false,
                refreshing: false
              },
              () => console.log(this.state)
            );
            this.dropDownAlertRef.alertWithType(
              "success",
              "Success",
              "Successfully Loaded List Of Valid Outpasses!!"
            );
          } else {
            this.setState({ refreshing: false });
            this.dropDownAlertRef.alertWithType(
              "error",
              "Error",
              "Some Error Occured While Loading!! Try Again Later"
            );
          }
        });
    }
  };

  componentDidMount() {
    console.log(this.state);
    if (this.state.loaded === false) {
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      if (month < 10) {
        var month1 = "0" + month;
      } else {
        var month1 = month;
      }
      var year = date.getFullYear();
      //console.log(date);
      var makeDate = year + "-" + month1 + "-" + day;
      //const value = await AsyncStorage.getItem('access_token');

      console.log(makeDate);
      fetch(
        "https://arcane-spire-87935.herokuapp.com/student/todaysList?currentDate=" +
          makeDate,
        {
          method: "GET"
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson.status === "200") {
            this.setState(
              {
                todaysList: JSON.parse(responseJson.outpassList),
                loaded: true,
                loading: false,
                refreshing: false
              },
              () => console.log(this.state)
            );
            this.dropDownAlertRef.alertWithType(
              "success",
              "Success",
              "Successfully Loaded List Of Valid Outpasses!!"
            );
          } else {
            this.setState({ refreshing: false });
            this.dropDownAlertRef.alertWithType(
              "error",
              "Error",
              "Some Error Occured While Loading!! Try Again Later"
            );
          }
        });
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    if (month < 10) {
      var month1 = "0" + month;
    } else {
      var month1 = month;
    }
    var year = date.getFullYear();
    //console.log(date);
    var makeDate = year + "-" + month1 + "-" + day;
    console.log(makeDate);

    fetch(
      "https://arcane-spire-87935.herokuapp.com/student/todaysList?currentDate=" +
        makeDate,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status === "200") {
          this.setState(
            {
              todaysList: JSON.parse(responseJson.outpassList),
              loaded: true,
              loading: false,
              refreshing: false
            },
            () => console.log(this.state)
          );
          this.dropDownAlertRef.alertWithType(
            "success",
            "Success",
            "Successfully Loaded List Of Valid Outpasses!!"
          );
        } else {
          this.setState({ refreshing: false });
          this.dropDownAlertRef.alertWithType(
            "error",
            "Error",
            "Some Error Occured While Loading!! Try Again Later"
          );
        }
      });
  };

  render() {
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
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={styles.dropdownalert}>
            <DropdownAlert
              ref={ref => (this.dropDownAlertRef = ref)}
              closeInterval={this.state.closeInterval}
            />
          </View>
          <ListDetails todaysList={this.state.todaysList} />
        </ScrollView>
      );
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

  container1: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    marginBottom: 0
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
  },
  dropdownalert: {
    alignItems: "center",
    width: "100%"
  }
});
