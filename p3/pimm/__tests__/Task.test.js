import * as TestRenderer from "react-test-renderer";
import React from "react";
import Task from "../Task";

beforeAll(() => {
  tree = TestRenderer.create(<Task />);
  TaskTest = TestRenderer.create(<Task />).getInstance();
});

test("Snapshot and state test of Task.js", () => {
  // Snapshot test
  expect(tree.toJSON).toMatchSnapshot();
  // State test
  expect(TaskTest.state.pressed).toEqual(false);
});
