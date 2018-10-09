import React, { Component } from "react";
import { ScrollView } from "react-native";
import { styles } from "./HomeScreen";
import { Task } from "./Task";

export class TasksToDo extends Component {
  constructor(props) {
    super(props);
    this.state.tasksArray = props.tasksArray;
    this.state.parent = props.parent;
  }

  state = {
    tasksArray: [],
    parent: null
  };

  render() {
    console.log("TasksToDo: ", this.state.tasksArray);
    return (
      <ScrollView
        contentContainerStyle={styles.taskContainer}
        scrollEnabled={true}
        alwaysBounceVertical={false}
      >
        {this.state.tasksArray.map(task => (
          <Task
            id={task.id}
            taskdescription={task.taskDesc}
            key={task.id}
            parent={this}
          />
        ))}
      </ScrollView>
    );
  }
}
