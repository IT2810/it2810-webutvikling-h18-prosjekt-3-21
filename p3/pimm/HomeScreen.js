import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Task } from "./Task";
import { TasksToDo } from "./TasksToDo";
import { TasksCompleted } from "./TasksCompleted";

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state.parent = props.parent;
  }
  
  state = {
    displayedTab: "todo",
    tasksArray: []
  };

  updateTasks() {
    this._retrieveData();
  }

  render() {
    let tasks;
    if (this.state.displayedTab === "todo") {
      tasks = <TasksToDo parent={this} />;
    } else if (this.state.displayedTab === "completed") {
      tasks = <TasksCompleted parent={this} />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.navBarTodo}>
          <TouchableOpacity onPress={this.onPressToDo} style={styles.button}>
            <View>
              <Text style={styles.buttonText}>TO DO</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressCompleted} style={styles.button}>
            <View>
              <Text style={styles.buttonText}>COMPLETE</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>{tasks}</View>
          <TouchableOpacity onPress={this.onPressAddTask} style={styles.addTaskButton}>
            <View>
              <Text style={styles.addTaskText}>+</Text>
            </View>
          </TouchableOpacity>
        
      </View>
    );
  }
  onPressToDo = () => {
    this.setState({ displayedTab: "todo" });
  };
  onPressCompleted = () => {
    this.setState({ displayedTab: "completed" });
  };
  onPressAddTask = () => {
    this.state.parent.handleAddTask();
  };
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  addtask: {
    flex: 1,
    width: "50%",
    marginTop: 0,
  },

  mainContainer: {
    flex: 7,
    width: "100%",
    // margin: 4,
    // borderTopColor: "rgba(111, 111, 111, 0.4)",
    // borderTopWidth: 5,
    // borderBottomColor: "rgba(111, 111, 111, 0.4)",
    // borderBottomWidth: 5
  },

  taskContainer: {
    margin: 1,
    alignItems: "center",
  },

  navBarTodo: {
    flex: 1,
    flexDirection: "row",
    padding: 0
  },
  button: {
    flex: 1,
    backgroundColor: "#5176A1",
    borderColor: "black",
    width: "100%",
    borderWidth: 1,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
  },

  addTaskButton: {
    backgroundColor: "#5176A1",
    borderColor: "black",
    width: 120,
    height: 120,
    borderWidth: 1,
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    position: 'absolute',
    bottom: -60
  },

  buttonText: {
    fontSize: 30,
    fontWeight: "700",
    color: '#fff'
  },

  addTaskText: {
    fontSize: 60, 
    position: 'relative', 
    bottom: 30,
    color: '#fff',
    fontWeight: "700",
  }

});
