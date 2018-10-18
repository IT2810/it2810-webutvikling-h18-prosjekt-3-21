import * as TestRenderer from "react-test-renderer";
import React from "react";
import View from "react-native";
//import TestRenderer from "react-test-renderer";
import App from "../App";
import HomeScreen from "../HomeScreen";
import PedometerSensor from "../PedoSensor";
import EditTaskScreen from "../EditTaskScreen";
import TasksCompleted from "../TasksCompleted";
import TasksToDo from "../TasksToDo";
import Task from "../Task";

beforeAll(() => {
  HomeScreenTest = TestRenderer.create(<HomeScreen />).getInstance();
});

test("State changes in HomeScreen.js works correctly", () => {
  // Check HomeScreen functions and state changes
  expect(HomeScreenTest.state.displayedTab).toEqual("todo");
  console.log("Homescreen state: ", HomeScreenTest.state.displayedTab);
  HomeScreenTest.onPressCompleted();
  console.log("Homescreen state: ", HomeScreenTest.state.displayedTab);
  expect(HomeScreenTest.state.displayedTab).toEqual("completed");
  HomeScreenTest.onPressToDo();
  expect(HomeScreenTest.state.displayedTab).toEqual("todo");
});
