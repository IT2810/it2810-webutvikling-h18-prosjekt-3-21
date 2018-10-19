import * as TestRenderer from "react-test-renderer";
import React from "react";
import HomeScreen from "../HomeScreen";

beforeAll(() => {
  tree = TestRenderer.create(<HomeScreen />);
  HomeScreenInst = TestRenderer.create(<HomeScreen />).getInstance();
});

test("Snapshot, state and method test in HomeScreen.js", () => {
  // Snapshot test
  expect(tree.toJSON).toMatchSnapshot();
  // State and method tests
  expect(HomeScreenInst.state.displayedTab).toEqual("todo");
  HomeScreenInst.onPressCompleted();
  expect(HomeScreenInst.state.displayedTab).toEqual("completed");
  HomeScreenInst.onPressToDo();
  expect(HomeScreenInst.state.displayedTab).toEqual("todo");
});
