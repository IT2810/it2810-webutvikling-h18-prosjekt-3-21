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
    this.state.id = props.id;
    this.state.taskdescription = props.taskdescription;
    this.state.parent = props.parent;
  }

  state = {
    id: 0,
    taskdescription: "Hent melk",
    parent: null,
    pressed: false
  };

  _onPressCompleteTask = () => {
    AsyncStorage.getItem(this.state.id, (err, result) => {
      let task = JSON.parse(result);
      task.isCompleted = true;
      AsyncStorage.setItem(this.state.id, JSON.stringify(task));
    }).then(() => {
      this.state.parent.updateTasks();
    });
  };

  _onPressDeleteTask = () => {
    AsyncStorage.removeItem(this.state.id);
    this.state.parent.updateTasks();
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
