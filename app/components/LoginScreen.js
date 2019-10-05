import React, { Component } from "react";
import {
  StyleSheet,
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage,
  Linking,
  Image
} from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Button } from "react-native-elements";
import DropdownAlert from "react-native-dropdownalert";
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: true,
      closeInterval: 2000,
      loginActive:true,
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem("user");
    if (value != null) {
      this.props.navigation.navigate("AppBar");
    } else {
      console.log("No Logged In User");
      this.setState({ loading: false });
    }
  };
  onLoginPress() {
    var username = this.state.username;
    var password = this.state.password;
    this.setState({ loading: true });
    fetch("https://arcane-spire-87935.herokuapp.com/user/validateUser/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        pass: password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status === "200") {
          console.log("Logged In");
          console.log(responseJson);
          this.setState({ loading: false });
          AsyncStorage.setItem("user", this.state.username);
          AsyncStorage.setItem("access_token", responseJson.access_token);
          AsyncStorage.setItem("refresh_token", responseJson.refresh_token);
          this.props.navigation.navigate("AppBar");

          this.dropDownAlertRef.alertWithType(
            "success",
            "Success",
            "Successfully Logged In!!"
          );

          //this.props.navigation.navigate('')
        } else {
          console.log("Invalid User");
          this.setState({ loading: false });
          this.dropDownAlertRef.alertWithType(
            "error",
            "Error",
            "Some No Such User Exists!!"
          );
        }
      });
  }

  set_username = e => {

    this.setState({ username: e });

    if(this.state.password.length>0 && this.state.username.length>0){
      this.setState({ loginActive: false });
    }
    else if(this.state.password.length==0 || this.state.username.length==0){
      this.setState({ loginActive: true });
    }
  };

  set_password = e => {
    this.setState({ password: e });
    if(this.state.password.length>0 && this.state.username.length>0){
      this.setState({ loginActive: false });
    }
    else if(this.state.password.length==0 || this.state.username.length==0){
      this.setState({ loginActive: true });
    }
  };

  openUrl = () => {
    var url = "https://github.com/abhinavsharma629";
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URL: " + url);
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
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
          <View style={styles.loginScreenContainer}>
            <DropdownAlert
              ref={ref => (this.dropDownAlertRef = ref)}
              closeInterval={this.state.closeInterval}
            />
            <View style={styles.loginFormView}>
            <TouchableOpacity>
            <Image
          style={{width: 30, height: 30,  borderRadius: 7, padding: 15, left:95, top:68 }}
          source={require('./images/scan.png')}
        />
        </TouchableOpacity>
              <Text style={styles.logoText}>Verifier</Text>
              <TextInput
                placeholder="Username"
                autoFocus
                autoCapitalize = 'none'
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={this.set_username}
              />
              <TextInput
                placeholder="Password"
                autoCapitalize = 'none'
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={true}
                onChangeText={this.set_password}
              />
              <TouchableOpacity style={styles.buttonTouchable} >
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={() => this.onLoginPress()}
                  title="Login"
                  disabled={this.state.loginActive}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.instructions} onPress={this.openUrl}>
              Developer : Abhinav Sharma{"\n"}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1
  },
  loginScreenContainer: {
    flex: 1
  },
  logoText: {
    fontSize: 45,
    fontFamily: 'Roboto',
    fontStyle: "italic",
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center"
  },
  logoText1: {
    fontSize: 20,
    fontWeight: "100",
    marginTop: 100,
    textAlign: "center"
  },
  loginFormView: {
    flex: 1,
    top:120
  },
  loginFormTextInput: {
    height: 45,
    fontSize: 14,
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
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    left: 18
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: "transparent"
  },
  buttonTouchable: {
    padding: 16
  },
  loader: {
    alignItems: "center",
    justifyContent: "center",
    top: "48%"
  },
  instructions: {
    fontWeight: "bold",
    fontSize:15,
    textAlign: "center",
    color: "#333333",
    marginBottom: 0
  }
});
