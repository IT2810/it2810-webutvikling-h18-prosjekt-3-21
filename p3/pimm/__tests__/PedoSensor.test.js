import * as TestRenderer from "react-test-renderer";
import React from "react";
import View from "react-native";
//import TestRenderer from "react-test-renderer";
import App from "../App";
import HomeScreen from "../HomeScreen";
import PedometerSensor from "../PedoSensor";
import EditTaskScreen from "../EditTaskScreen";
import TasksCompleted from "../TasksCompleted";
import TasksToDo from "../TasksToDo";
import Task from "../Task";

beforeAll(() => {
  tree = TestRenderer.create(<PedometerSensor />);
  PedometerInst = TestRenderer.create(<PedometerSensor />).getInstance();
  //console.log(PedometerSensorInst);
});

test("State changes in PedoSensor.js works correctly", () => {
  // Snapshot test
  expect(tree.toJSON).toMatchSnapshot();

  // Check PedometerSensor functions
  PedometerInst.getStepPercent();
  expect(PedometerInst.state.showGoalSetup).toEqual(false);
  PedometerInst.onPressConfig();
  expect(PedometerInst.state.showGoalSetup).toEqual(true);
  expect(PedometerInst.state.configStepGoalPending).toEqual(10000);
  PedometerInst.onPressIncrementGoal();
  expect(PedometerInst.state.configStepGoalPending).toEqual(10100);
  PedometerInst.onPressDecrementGoal();
  expect(PedometerInst.state.configStepGoalPending).toEqual(10000);
  PedometerInst._subscribe();
  PedometerInst._unsubscribe();
  PedometerInst.increment();
});
