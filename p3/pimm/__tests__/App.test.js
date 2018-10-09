import React from "react";
import App from "../App";

import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
<<<<<<< HEAD
=======
  expect(tree.type).toEqual("View");
>>>>>>> master
  expect(tree).toMatchSnapshot();
});
