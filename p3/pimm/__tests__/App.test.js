import * as TestRenderer from "react-test-renderer";
import React from "react";
import App from "../App";
import EditTaskScreen from "../EditTaskScreen";

beforeAll(() => {
  renderer = TestRenderer.create(<App />);
  rendererJSON = renderer.toJSON();
  instance = renderer.getInstance();
});

test("Snapshot, state and method tests in App.js", () => {
  // Snapshot test
  expect(rendererJSON).toMatchSnapshot();
  // State and method tests
  expect(instance.state.currentTab).toEqual("HomeScreen");
  instance.handleAddTask();
  // Save the EditTaskScreen as an instance
  EditTaskScreenInst = renderer.root.findByType(EditTaskScreen).instance;
  // Continue state and method tests
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
