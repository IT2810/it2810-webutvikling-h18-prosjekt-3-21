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
  renderer = TestRenderer.create(<App />);
  rendererJSON = renderer.toJSON();
});

test("State changes in App.js works correctly", () => {
  expect(rendererJSON).toMatchSnapshot();
  instance = renderer.getInstance();
  expect(instance.state.currentTab).toEqual("HomeScreen");
  instance.handleAddTask();
  // Save the EditTaskScreen as an instance
  EditTaskScreenInst = renderer.root.findByType(EditTaskScreen).instance;

  expect(instance.state.currentTab).toEqual("AddTaskScreen");
  instance.handlePressBack();
  expect(instance.state.currentTab).toEqual("HomeScreen");
  instance.handleNavbarPress("Pedometer");
  expect(instance.state.currentTab).toEqual("Pedometer");

  instance.handleNavbarPress("HomeScreen");
  expect(instance.state.currentTab).toEqual("HomeScreen");

  // Check EditTaskScreen function
  EditTaskScreenInst.onPressBack();
});
