import React, { Component } from "react";
import {
  AsyncStorage,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image
} from "react-native";
import { styles } from "./HomeScreen";

export class EditTaskScreen extends Component {
  constructor(props) {
    super(props);
    this.state.parent = props.parent;
    this.state.taskDescription = props.taskdesc;
    this.state.taskID = props.taskid;
    this.state.taskType = "regTask";
    this.state.tasksArray = [];
  }

  componentDidMount() {
    //AsyncStorage.clear();
    _retrieveData = async () => {
      let taskArr = [];
      try {
        AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
              taskArr.push(store[i][1]);
            });
          });
        }).then(() => {
          this.setState({
            tasksArray: taskArr
          });
        });
      } catch (error) {
        console.log(error);
        Alert.alert("Error retrieving data");
      }
    };

    _retrieveData();
  }

  state = {};
  render() {
    return (
      <View style={stylesEditScreen.container}>
        <View style={stylesEditScreen.editTaskHeader}>
          <Text style={stylesEditScreen.editTaskHeaderText}>ADD/EDIT TASK</Text>
        </View>  
        <View style={stylesEditScreen.textInputContainer}>
          <TextInput
            style={stylesEditScreen.textInputField}
            placeholder="Enter task name..."
            blurOnSubmit={true}
            value={this.state.taskDescription}
            multiline={true}
            placeholderTextColor={"gray"}
            onChangeText={text => this.setState({ taskDescription: text })}
          />
        </View>
        <View style={stylesEditScreen.buttonContainer}>
          <TouchableOpacity onPress={this.onPressBack} style={stylesEditScreen.button}>
            <Image
              source={require("./assets/back.png")}
              style={stylesEditScreen.buttonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressSaveTask} style={stylesEditScreen.button}>
            <View>
              <Image
                source={require("./assets/accept.png")}
                style={stylesEditScreen.buttonIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onPressBack = () => {
    this.state.parent.handlePressBack();
  };
  isDefined(obj) {
    return obj && obj !== "null" && obj !== "undefined";
  }

  onPressSaveTask = async () => {
    let counter;
    try {
      AsyncStorage.getItem("counter")
        .then(result => {
          counter = result;
        })
        .then(() => {
          console.log("Retreived from async, counter:", counter);
          if (!this.isDefined(counter)) {
            //console.log("counter is not defined or null");
            counter = 0;
          } else {
            counter = parseInt(counter);
            counter += 1;
            //console.log("counter incremented");
          }
          if (typeof this.state.taskID != "undefined") {
            var task = {
              id: this.state.taskID,
              taskDesc: this.state.taskDescription,
              isCompleted: false
            };
          } else {
            var task = {
              id: counter,
              taskDesc: this.state.taskDescription,
              isCompleted: false
            };
          }
          task.id_str = "" + task.id;
          AsyncStorage.setItem("counter", JSON.stringify(counter)).then(() => {
            //console.log("counter stored");
          });
          AsyncStorage.setItem(task.id_str, JSON.stringify(task)).then(() => {
            this.state.parent.handlePressBack();
          });
        });
    } catch (error) {
      console.log(error);
      alert("Error saving data!");
    }
  };
}

export const stylesEditScreen = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  textInputField: {
    height: 60,
    margin: 10,
  },

  editTaskHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },

  editTaskHeaderText: {
    fontSize: 40,
    fontWeight: "700",
    color: '#fff',
    textShadowColor: "#29436d",
    textShadowRadius: 0,
    textShadowOffset: {width: 2, height: 1}
  },

  textInputContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },

  textInputField: {
    backgroundColor: '#fff',
    height: '40%',
    width: '80%',
    textAlign: 'center',
    paddingTop: 30,
    borderRadius: 10,
    borderColor: '#333',
    borderWidth: 2
  },

  buttonContainer: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row'
  },

  buttonIcon: {
    height: 80,
    width: 80,
    margin: 40
  }


});
