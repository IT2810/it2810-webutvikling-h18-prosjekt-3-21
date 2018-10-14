import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "./HomeScreen";
import { EditTaskScreen } from "./EditTaskScreen";
import { PedometerSensor } from "./PedoSensor";

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
    return (<PedometerSensor />)
  }
}
