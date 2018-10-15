import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "./HomeScreen";
import { EditTaskScreen } from "./EditTaskScreen";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    currentTab: "HomeScreen"
  };
  handleAddTask = () => {
    this.setState({ currentTab: "AddTaskScreen" });
  };
  handlePressBack = () => {
    this.setState({ currentTab: "HomeScreen" });
  };
  handleEditTask = (id, desc) => {
    displayedScreen = (
      <EditTaskScreen parent={this} taskid={id} taskdesc={desc} />
    );
    this.setState({ currentTab: "EditTaskScreen" });
  };

  render() {
    if (this.state.currentTab === "HomeScreen") {
      displayedScreen = <HomeScreen parent={this} />;
    } else if (this.state.currentTab === "AddTaskScreen") {
      displayedScreen = <EditTaskScreen parent={this} />;
    }
    return displayedScreen;
  }
}