import * as TestRenderer from "react-test-renderer";
import React from "react";
import EditTaskScreen from "../EditTaskScreen";

beforeAll(() => {
  tree = TestRenderer.create(<EditTaskScreen />);
});

test("Snapshot test of EditTaskScreen.js", () => {
  expect(tree.toJSON).toMatchSnapshot();
});
