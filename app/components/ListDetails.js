import React from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Linking,
  Vibration,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  Alert,
  ScrollView
} from "react-native";

import {
  Container,
  Title,
  Left,
  Right,
  Body,
  Content,
  CardItem
} from "native-base";

import { ActivityIndicator, Colors } from "react-native-paper";

import {
  Card,
  ListItem,
  FlatList,
  Button,
  Icon,
  Header,
  SearchBar
} from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from "react-native-linear-gradient"; // Only if no expo

import OutpassScreen from "./OutpassScreen";
import DropdownAlert from "react-native-dropdownalert";

import RNFetchBlob from "react-native-fetch-blob";
import { PermissionsAndroid } from "react-native";
import FileViewer from "react-native-file-viewer";
export default class ListDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todaysList: this.props.todaysList,
      modalVisible: false,
      currentOutpass: {},
      search: "",
      closeInterval: 2000,
      searchedResults: this.props.todaysList
    };
  }

componentWillReceiveProps(props) {
  this.setState({todaysList:this.props.todaysList, searchedResults:this.props.todaysList })
}
  modalDrop = outpass => {
    console.log(outpass);
    this.setState({
      modalVisible: true,
      currentOutpass: outpass
    });
  };

  updateSearch = search => {
    if (search.length === 0) {
      var outp = this.state.todaysList;
    } else {
      var outp = this.state.todaysList.filter(function(outpass, i) {
        return outpass.outpassId == search;
      });
      if (outp.length === 0) {
        var outp = this.state.todaysList.filter(function(outpass, i) {
          return outpass.student.other_details.first_name.startsWith(search);
        });
      }
    }
    console.log(outp);
    this.setState({ search: search, searchedResults: outp });
  };

  async grant() {
    // var granted=await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE )
    // return granted;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Storage Permission",
        message: "App needs access to memory to download the file "
      }
    );
    return granted;
  }

  export = () => {
    var granted = this.grant().then(status => {
      console.log("Status is:- " + " " + status);
      if (status) {
        console.log("You can use the ACCESS_FINE_LOCATION");
        var csvData = [];
        csvData.push([
          "Name",
          "Enrollment_Number",
          "From_Date",
          "To_Date",
          "Address_While_Leave",
          "Purpose_Of_Leave"
        ]);
        this.state.todaysList.map((outpass, i) =>
          csvData.push([
            outpass.student.other_details.first_name +
              " " +
              outpass.student.other_details.last_name,
            "171B009",
            outpass.fromDate,
            outpass.toDate,
            outpass.addressWhileLeave,
            outpass.purposeOfLeave
          ])
        );

        var str = csvData
          .map(d => `${d[0]},${d[1]}, ${d[2]}, ${d[3]}, ${d[4]},${d[5]}\n`)
          .join("");

        let dirs = RNFetchBlob.fs.dirs;

        console.log(dirs.DownloadDir + "/data.csv");
        var config = RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
            notification: true,
            path: dirs.DownloadDir + "/data.csv", // this is the path where your downloaded file will live in
            description: "Downloading Excel Sheet."
          }
        });
        console.log(config);
        RNFetchBlob.fs
          .writeFile(dirs.DownloadDir + "/data.csv", str, "utf-8")
          .then(success => {
            console.log("FILE WRITTEN!");
            this.dropDownAlertRef.alertWithType(
              "success",
              "Success",
              "Successfully downloaded file!!\n Location:- " +
                dirs.DownloadDir +
                "/data.csv"
            );
            const path = dirs.DownloadDir + "/data.csv";
            FileViewer.open(path, { showOpenWithDialog: true })
              .then(() => {
                // success
              })
              .catch(error => {
                // error
              });
          })
          .catch(err => {
            console.log(err.message);
          });
      } else {
        console.log("ACCESS_FINE_LOCATION permission denied");
      }
    });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.dropdownalert}>
          <DropdownAlert
            ref={ref => (this.dropDownAlertRef = ref)}
            closeInterval={this.state.closeInterval}
          />
        </View>
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={{ marginTop: 22 }}>
              <ScrollView>
                <OutpassScreen data={this.state.currentOutpass} />
                <TouchableOpacity style={styles.buttonTouchable}>
                  <Button
                    style={styles.buttonText}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                    title="Close"
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>

          <Header
            leftComponent={{ icon: "assignment", color: "#fff", top: -10 }}
            rightComponent=
              <TouchableOpacity
                style={{ height: -30, width: 80, marginTop: -22 }}
                onPress={this.export}
              >
                <Icon name="exclefile1" type="antdesign" color="#fff" />
              </TouchableOpacity>

            centerComponent={{
              text:
                "List For - " +
                new Date().getDate() +
                " / " +
                ("0" + (new Date().getMonth() + 1)).slice(-2) +
                " / " +
                new Date().getFullYear(),
              style: {
                color: "#fff",
                fontSize: 17,
                fontWeight: "bold",
                top: -10,
                left: -5
              }
            }}
            containerStyle={{
              backgroundColor: "#3D6DCC",
              height: 50,
              justifyContent: "space-around"
            }}
          />

          <SearchBar
            placeholder="Search Outpass Id / Name ..."
            onChangeText={this.updateSearch}
            value={this.state.search}
            platform="ios"
          />
          {this.state.searchedResults.map((outpass, i) => (
            <View key={i}>
              <ListItem
                key={outpass.outpassId}
                onPress={this.modalDrop.bind(this, outpass)}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                linearGradientProps={{
                  colors: ["white", "white"] //color[Math.floor(Math.random() * color.length)]
                }}
                style={{
                  margin: 10,
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: "#ddd",
                  borderBottomWidth: 0,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 2
                }}
                ViewComponent={LinearGradient} // Only if no expo
                leftAvatar={{
                  rounded: true,
                  source: {
                    uri:
                      "https://arcane-spire-87935.herokuapp.com" +
                      outpass.student.photo
                  }
                }}
                title={
                  outpass.student.other_details.first_name +
                  " " +
                  outpass.student.other_details.last_name
                }
                titleStyle={{ color: "black", fontWeight: "bold" }}
                subtitleStyle={{ color: "black" }}
                subtitle={outpass.fromDate + " - " + outpass.toDate}
                chevronColor="white"
                chevron
              />
            </View>
          ))}
        </View>
        <Text style={styles.instructions}>
          Developer:- Abhinav Sharma{"\n"}
        </Text>
      </ScrollView>
    );
  }
}

const color = [
  ["#FF9800", "#F44336"],
  ["#CD5C5C", "#ffbf00"],
  ["#b7b6aa", "#5fb7ca"],
  ["#e6194b", "#3cb44b"],
  ["#ffe119", "#4363d8"],
  ["#f58231", "#911eb4"],
  ["#46f0f0", "#f032e6"],
  ["#bcf60c", "#fabebe"],
  ["#008080", "#e6beff"],
  ["#9a6324", "#fffac8"],
  ["#800000", "#aaffc3"],
  ["#808000", "#ffd8b1"],
  ["#000075", "#808080"],
  ["#FF2800", "#F54336"]
];

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#8E8E8E"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },

  container1: {
    flex: 1,
    backgroundColor: "#717555"
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    flex: 0,
    justifyContent: "flex-end",
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333"
  },

  buttonText: {
    color: "rgb(0,230,255)"
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
