import React from "react";
import TestRenderer from "react-test-renderer";
import renderer from "react-test-renderer";
import App from "../App";
import HomeScreen from "../HomeScreen";

test("HomeScreen 3 testing", () => {
  const tree = renderer.create(<App />);
  let inst = tree.getInstance();

  // Test state changes
  expect(inst.state.currentTab).toEqual("HomeScreen");
  inst.handleEditTask();
  expect(inst.state.currentTab).toEqual("EditTaskScreen");
  inst.handlePressBack();
  expect(inst.state.currentTab).toEqual("HomeScreen");

  // Test task categories in HomeScreen.js
  HomeScreenInst = tree.toTree().rendered.instance;
  expect(HomeScreenInst.state.displayedTab).toEqual("todo");
  HomeScreenInst.onPressCompleted();
  expect(HomeScreenInst.state.displayedTab).toEqual("completed");

  // Test EdiTaskScreen.js
  inst.handleEditTask();
  EditTaskScreenInst = tree.toTree().rendered.instance;
  EditTaskScreenInst.onPressBack();
});
