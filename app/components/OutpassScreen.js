import React, { Component } from "react";
import { DataTable } from "react-native-paper";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Linking,
  Vibration,
  Dimensions,
  TouchableOpacity,
  Container,
  Content,
  FormControl,
  ScrollView
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import DropdownAlert from "react-native-dropdownalert";

import {
  Header,
  Card,
  List,
  ListItem,
  Button,
  Input,
  InputGroup,
  TextArea,
  Tooltip,
  Image
} from "react-native-elements";

class OutpassScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      outpassData: this.props.data,
      loading: false
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <ScrollView>
        <TextInput
          placeholder="Student's Name"
          shake={true}
          editable={false}
          style={styles.loginFormTextInput}
          leftIcon={<Icon name="user" size={17} color="black" />}
          value={
            this.state.outpassData.student.other_details.first_name +
            " " +
            this.state.outpassData.student.other_details.last_name
          }
        />
        <Text />
        <Header
          leftComponent={{ icon: "assignment", color: "#fff", top: -10 }}
          centerComponent={{
            text: "Outpass Details - " + this.state.outpassData.outpassId,
            style: { color: "#fff", fontSize: 17, fontWeight: "bold", top: -10 }
          }}
          containerStyle={{
            backgroundColor: "#3D6DCC",
            height: 50,
            justifyContent: "space-around"
          }}
        />
        <Text />
        <Input
          placeholder="Number Of Days"
          shake={true}
          editable={false}
          leftIcon={<Icon name="hourglass" size={17} color="black" />}
          value={String(this.state.outpassData.no_of_days)}
          style={{ left: 20 }}
        />

        <Text />
        <Input
          placeholder="From Date"
          shake={true}
          editable={false}
          leftIcon={<Icon name="calendar-check-o" size={17} color="black" />}
          value={this.state.outpassData.fromDate}
        />

        <Input
          placeholder="To Date"
          shake={true}
          editable={false}
          leftIcon={<Icon name="calendar-plus-o" size={17} color="black" />}
          value={this.state.outpassData.toDate}
        />

        <Text />
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder="Address While Leave"
          shake={true}
          disabled={true}
          editable={false}
          value={this.state.outpassData.addressWhileLeave}
          style={styles.loginFormTextInput1}
        />
        <Text />
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder="Purpose Of Leave"
          shake={true}
          disabled={true}
          editable={false}
          value={this.state.outpassData.purposeOfLeave}
          style={styles.loginFormTextInput1}
        />
        <Text />
        <Image
          source={{
            uri:
              "https://arcane-spire-87935.herokuapp.com" +
              this.state.outpassData.whatsappImg
          }}
          style={{ width: 400, height: 400, left: 5 }}
        />
        <Text style={styles.instructions}>
          Developer:- Abhinav Sharma{"\n"}
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  /*
   * Removed for brevity
   */
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#8E8E8E"
  },
  container: {
    flex: 1,
    padding: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    marginLeft: 12,
    fontSize: 16
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  instructions: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  loginFormTextInput: {
    height: 45,
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5
  },

  loginFormTextInput1: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5
  }
});

export default OutpassScreen;
