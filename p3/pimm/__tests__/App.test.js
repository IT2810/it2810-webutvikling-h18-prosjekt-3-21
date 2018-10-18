import React from "react";
import App from "../App";

import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<App />);
  let treeJSON = tree.toJSON();
  expect(treeJSON.type).toEqual("View");
  expect(treeJSON).toMatchSnapshot();

  let inst = tree.root;

  // Test state changes in App.js
  expect(inst.state.currentTab).toEqual("HomeScreen");
  inst.handleEditTask();
  expect(inst.state.currentTab).toEqual("EditTaskScreen");
  inst.handlePressBack();
  expect(inst.state.currentTab).toEqual("HomeScreen");
  inst.handleNavbarPress("Pedometer");
  expect(inst.state.currentTab).toEqual("Pedometer");
});
