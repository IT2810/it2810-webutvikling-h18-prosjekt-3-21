import React from "react";
import TestRenderer from "react-test-renderer";
import renderer from "react-test-renderer";
import App from "../App";
import HomeScreen from "../HomeScreen";

test("Task functionality testing", () => {
  const tree = renderer.create(<App />);
  let inst = tree.getInstance();

  // Test task categories in HomeScreen.js
  AppInstance = tree.toTree();
  HomeScreenInst = tree.toTree().rendered.instance;
  expect(HomeScreenInst.state.displayedTab).toEqual("todo");
  AppInstance.handleNavbarPress();
  AppInstance.onPressTodo();
  expect(HomeScreenInst.state.displayedTab).toEqual("todo");

  // Test EdiTaskScreen.js
  inst.handleEditTask();
  EditTaskScreenInst = tree.toTree().rendered.instance;
  EditTaskScreenInst.onPressBack();
});
