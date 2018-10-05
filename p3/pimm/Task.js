import React from "react";
import {
  Alert,
  AppRegistry,
  AsyncStorage,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
  Image
} from "react-native";

export class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state.taskdescription = props.taskdescription;
  }

  state = {
    taskdescription: "Hent melk",
    pressed: false
  };

  componentDidMount() {
    _storeData = async () => {
      try {
        await AsyncStorage.setItem("Task1", "Hallo der du!");
      } catch (error) {
        Alert.alert("Error saving data!");
      }
    };

    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem("Task1");
        if (value != null) {
          console.log(value);
        }
      } catch (error) {
        Alert.alert("Error retrieving data");
      }
    };

    _storeData();
    _retrieveData();
  }

  _onPressCompleteTask = () => {
    Alert.alert("Complete task");
  };

  _onPressDeleteTask = () => {
    Alert.alert("Delete task");
  };

  _onPressEditTask = () => {
    Alert.alert("Edit task");
  };

  _toggleTaskOptions = () => {
    let s = !this.state.pressed;
    this.setState({ pressed: s });
  };

  render() {
    let taskItem;
    if (this.state.pressed === false) {
      taskItem = (
        <TouchableOpacity onPress={this._toggleTaskOptions} style={styles.task}>
          <Text style={styles.taskdescription}>
            {this.state.taskdescription}
          </Text>
        </TouchableOpacity>
      );
    } else {
      taskItem = (
        <View style={styles.taskoptions}>
          <TouchableOpacity onPress={this._toggleTaskOptions}>
            <Image
              source={require("./assets/back.png")}
              style={styles.taskoptionbutton}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this._onPressEditTask}>
            <Image
              source={require("./assets/edit.png")}
              style={styles.taskoptionbutton}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this._onPressDeleteTask}>
            <Image
              source={require("./assets/delete.png")}
              style={styles.taskoptionbutton}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this._onPressCompleteTask}>
            <Image
              source={require("./assets/accept.png")}
              style={styles.taskoptionbutton}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return taskItem;
  }
}

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 100,
    borderColor: "#999",
    borderWidth: 3,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10
  },

  taskoptions: {
    flexDirection: "row",
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 100,
    borderColor: "#999",
    borderWidth: 3,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10
  },

  taskoptionbutton: {
    width: 48,
    height: 48
  },

  taskdescription: {
    color: "#333",
    flex: 5
  }
});
