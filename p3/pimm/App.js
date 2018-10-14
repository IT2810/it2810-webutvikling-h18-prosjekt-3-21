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
  handleEditTask = () => {
    this.setState({ currentTab: "EditTaskScreen" });
  };
  handlePressBack = () => {
    this.setState({ currentTab: "HomeScreen" });
  };

  render() {
    if (this.state.currentTab === "HomeScreen") {
      displayedScreen = <HomeScreen parent={this} />;
    } else if (this.state.currentTab === "EditTaskScreen") {
      displayedScreen = <EditTaskScreen parent={this} />;
    }
    return displayedScreen;
  }
}