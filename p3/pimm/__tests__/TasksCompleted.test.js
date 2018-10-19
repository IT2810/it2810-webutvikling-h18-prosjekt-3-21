import * as TestRenderer from "react-test-renderer";
import React from "react";
import TasksCompleted from "../TasksCompleted";

beforeAll(() => {
  tree = TestRenderer.create(<TasksCompleted />);
  TasksToDoTest = TestRenderer.create(<TasksCompleted />).getInstance();
});

test("Snapshot test of TasksCompleted.js", () => {
  expect(tree.toJSON).toMatchSnapshot();
});
