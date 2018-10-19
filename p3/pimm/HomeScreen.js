import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
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

    let addTaskButton;
    if (this.state.displayedTab === "todo") {
      addTaskButton = (
        <TouchableOpacity
          onPress={this.onPressAddTask}
          style={styles.addTaskButton}
        >
          <Image
            source={require("./assets/plus.png")}
            style={styles.addTaskButtonImage}
          />
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.navBarTodo}>
          <TouchableOpacity
            onPress={this.onPressToDo}
            style={[
              this.state.displayedTab == "todo"
                ? styles.activeButton
                : styles.button,
              { borderLeftWidth: 0 }
            ]}
          >
            <View>
              <Text
                style={
                  this.state.displayedTab == "todo"
                    ? styles.activeButtonText
                    : styles.buttonText
                }
              >
                TO DO
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressCompleted}
            style={[
              this.state.displayedTab == "completed"
                ? styles.activeButton
                : styles.button,
              { borderRightWidth: 0 }
            ]}
          >
            <View>
              <Text
                style={
                  this.state.displayedTab == "completed"
                    ? styles.activeButtonText
                    : styles.buttonText
                }
              >
                COMPLETED
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>{tasks}</View>
        {addTaskButton}
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
export default HomeScreen;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0 //20
  },

  mainContainer: {
    flex: 7,
    width: "100%",
    marginTop: 10,
    marginBottom: 20
  },

  taskContainer: {
    margin: 1,
    alignItems: "center",
    paddingBottom: 100
  },

  navBarTodo: {
    flex: 1,
    flexDirection: "row",
    padding: 0,
    marginTop: 30
  },

  button: {
    flex: 1,
    backgroundColor: "#5176A1",
    borderColor: "#29436d",
    width: "100%",
    borderWidth: 1,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3
  },

  activeButton: {
    flex: 1,
    backgroundColor: "lightblue",
    borderColor: "#29436d",
    width: "100%",
    borderWidth: 1,
    borderBottomWidth: 0,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    fontSize: 29,
    // fontWeight: "bold",
    color: "#444",
    textShadowColor: "#29436d",
    textShadowRadius: 0,
    textShadowOffset: { width: 1, height: 1 }
  },

  activeButtonText: {
    fontSize: 30,
    //fontWeight: "200",
    color: "#fff",
    textShadowColor: "#29436d",
    textShadowRadius: 0,
    textShadowOffset: { width: 1, height: 1 }
  },

  addTaskButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: "5%",
    right: "5%",
    padding: 0
  },

  addTaskButtonImage: {
    width: 60,
    height: 60
  }
});
