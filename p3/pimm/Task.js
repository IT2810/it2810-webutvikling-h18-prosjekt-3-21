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
    // Runs it up to App.js, via HomeScreen.js and TasksToDo.js
    this.state.parent.state.parent.state.parent.handleEditTask(
      this.state.id,
      this.state.taskdescription
    );
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
      if (this.state.parent.state.parent.state.displayedTab == "todo") {
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
      } else {
        taskItem = (
          <View style={styles.taskoptions}>
            <TouchableOpacity onPress={this._toggleTaskOptions}>
              <Image
                source={require("./assets/back.png")}
                style={styles.taskoptionbutton}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={this._onPressDeleteTask}>
              <Image
                source={require("./assets/delete.png")}
                style={styles.taskoptionbutton}
              />
            </TouchableOpacity>
          </View>
        );
      }
    }
    return taskItem;
  }
}
export default Task;

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    height: 70,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5
  },

  taskoptions: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    height: 70,
    borderColor: "#999",
    borderWidth: 2,
    borderRadius: 4,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5
  },

  taskoptionbutton: {
    width: 48,
    height: 48
  },

  taskdescription: {
    color: "#444",
    flex: 5,
    fontWeight: "600",
    fontSize: 18
  }
});
