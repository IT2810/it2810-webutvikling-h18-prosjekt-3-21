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
  tree = TestRenderer.create(<EditTaskScreen />);
  EditTaskScreenTest = TestRenderer.create(<EditTaskScreen />).getInstance();
});

test("Methods in EditTaskScreen.js works correctly", () => {
  // Snapshot test
  expect(tree.toJSON).toMatchSnapshot();
});
