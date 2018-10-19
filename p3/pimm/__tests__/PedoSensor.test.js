import * as TestRenderer from "react-test-renderer";
import React from "react";
import PedometerSensor from "../PedoSensor";

beforeAll(() => {
  tree = TestRenderer.create(<PedometerSensor />);
  PedometerInst = TestRenderer.create(<PedometerSensor />).getInstance();
});

test("Snapshot in PedoSensor.js works correctly", () => {
  // Snapshot test
  expect(tree.toJSON).toMatchSnapshot();
  // State and method tests
  PedometerInst.getStepPercent();
  expect(PedometerInst.state.showGoalSetup).toEqual(false);
  PedometerInst.onPressConfig();
  PedometerInst._LoadGoal();
  expect(PedometerInst.state.showGoalSetup).toEqual(true);
  expect(PedometerInst.state.configStepGoalPending).toEqual(1000);
  PedometerInst.onPressIncrementGoal();
  expect(PedometerInst.state.configStepGoalPending).toEqual(1100);
  PedometerInst.onPressDecrementGoal();
  expect(PedometerInst.state.configStepGoalPending).toEqual(1000);
  PedometerInst._subscribe();
  PedometerInst._unsubscribe();
  PedometerInst.increment();
});
