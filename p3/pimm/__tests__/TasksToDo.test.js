import * as TestRenderer from "react-test-renderer";
import React from "react";
import TasksToDo from "../TasksToDo";

beforeAll(() => {
  tree = TestRenderer.create(<TasksToDo />);
});

test("Snapshot test of TasksToDo.js", () => {
  expect(tree.toJSON).toMatchSnapshot();
});
