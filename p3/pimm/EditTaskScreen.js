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
    this.state.taskDescription;
    this.state.taskType = "regTask";
    this.state.tasksArray = [];
  }

  componentDidMount() {
    _retrieveData = async () => {
      let taskArr = [];
      try {
        AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
              console.log("key: ", store[i][0]);
              console.log("value: ", store[i][1]);
              //for (let key in store) {
              // console.log(store[i][key]);
              //}
              taskArr.push(store[i][1]);
              console.log(taskArr);
            });
          });
        }).then(() => {
          this.setState({
            tasksArray: taskArr
          });
          console.log("heheheheheeheh");
        });
        /*
        const result = await AsyncStorage.getItem("tasks");
        if (result != null) {
          //let taskArr = JSON.parse(result);
          //console.log("Length of array: ", taskArr.length);
          this.setState({
            //tasksArray: taskArr
          });
        } else {
          console.log("result is null");
        }
        */
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
    try {
      const task = {
        id: "task " + (this.state.tasksArray.length + 1),
        taskDesc: this.state.taskDescription,
        type: this.state.taskType
      };
      //let tasks = this.state.tasksArray;
      //tasks.push(task);
      //console.log("tasks: " + tasks);
      await AsyncStorage.setItem(task.id, JSON.stringify(task));
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
