import React, { Component } from "react";
import {
  AsyncStorage,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Picker
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
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button}>
            <View>
              <Text style={styles.buttonText}>Add task</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <TextInput
            style={stylesEditScreen.textInputField}
            placeholder="Add task description here"
            blurOnSubmit={true}
            value={this.state.taskDescription}
            multiline={true}
            placeholderTextColor={"gray"}
            onChangeText={text => this.setState({ taskDescription: text })}
          />
          <View style={stylesEditScreen.pickerField}>
            <Text>Pick task type:</Text>
            <Picker
              selectedValue={this.state.taskType}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ taskType: itemValue })
              }
            >
              <Picker.Item label="Regular" value="regTask" />
              <Picker.Item label="Steps" value="stepTask" />
            </Picker>
          </View>
        </View>
        <View style={styles.navBarBottom}>
          <TouchableOpacity onPress={this.onPressBack} style={styles.button}>
            <View>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressSaveTask}
            style={styles.button}
          >
            <View>
              <Text style={styles.buttonText}>Save task</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onPressBack = () => {
    this.state.parent.handlePressBack();
  };

  onPressSaveTask = async () => {
    let result = {};
    let counter;
    try {
      AsyncStorage.getItem("counter")
        .then(result => {
          counter = result;
          console.log("counter: ", counter);
          // rest of script
        })
        .then(() => {
          console.log("Retreived from async, counter:", counter);
          if (typeof counter == "undefined" || typeof counter == "null") {
            console.log("counter is not defined or null");
            counter = 0;
          } else {
            counter = parseInt(counter);
            counter += 1;
            console.log("counter incremented");
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
            console.log("in the else", task.id);
          }
          task.id_str = "" + task.id;
          AsyncStorage.setItem("counter", JSON.stringify(counter)).then(() => {
            console.log("stores counter");
          });
          AsyncStorage.setItem(task.id_str, JSON.stringify(task));
        });
    } catch (error) {
      console.log(error);
      alert("Error saving data!");
    }
  };
}

export const stylesEditScreen = StyleSheet.create({
  textInputField: {
    height: 60,
    margin: 10
  },
  pickerField: {
    margin: 30
  }
});
