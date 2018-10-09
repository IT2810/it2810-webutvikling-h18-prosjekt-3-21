import React, { Component } from "react";
import { ScrollView } from "react-native";
import { styles } from "./HomeScreen";
import { Task } from "./Task";

export class TasksCompleted extends Component {
  state = {};
  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.taskContainer}
        scrollEnabled={true}
        alwaysBounceVertical={false}
      >
        <Task taskdescription="Completed task" />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </ScrollView>
    );
  }
}
