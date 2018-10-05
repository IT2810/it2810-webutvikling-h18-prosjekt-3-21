import React, { Component } from "react";
import { ScrollView } from "react-native";
import { styles } from "./HomeScreen";
import { Task } from "./Task";

export class TasksToDo extends Component {
  state = {};
  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.taskContainer}
        scrollEnabled={true}
        alwaysBounceVertical={false}
      >
        <Task taskdescription="Get milk" />
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
