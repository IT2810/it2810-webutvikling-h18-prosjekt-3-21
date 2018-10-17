import React from "react";
import TestRenderer from "react-test-renderer";
import renderer from "react-test-renderer";
import App from "../App";
import HomeScreen from "../HomeScreen";

test("Task functionality testing", () => {
  // const testRenderer = TestRenderer.create(<App />);
  // const testInstance = testRenderer.root;
  // //console.log(testInstance.child);
  // console.log(testInstance.findByType(HomeScreen));

  // //expect(testInstance.findByType(HomeScreen).state).toBe('bar');
  // //expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);

  const tree = renderer.create(<App />);
  let inst = tree.getInstance();

  // Test task categories in HomeScreen.js
  AppInstance = tree.toTree();
  AppJSON = tree.toJSON();
  console.log(AppInstance);
  // HomeScreenInst = AppInstance.rendered.instance;
  //console.log(HomeScreenInst);
  // expect(HomeScreenInst.state.displayedTab).toEqual("todo");
  // AppInstance.handleNavbarPress();
  // AppInstance.onPressTodo();
  // expect(HomeScreenInst.state.displayedTab).toEqual("todo");

  // // Test EdiTaskScreen.js
  // inst.handleEditTask();
  // EditTaskScreenInst = tree.toTree().rendered.instance;
  // EditTaskScreenInst.onPressBack();
});
