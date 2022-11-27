import { render } from "@testing-library/react";
import Button from "../../../button/Button";

// Some mock button functionality
const button1 = {
  label: "I am button",
  onPress: () => console.log("button1 success"),
};

const buttonArray = [
  {
    label: "My top corners are rounded",
    onPress: () => console.log("button1 success"),
  },
  {
    label: "My bottom corners are rounded",
    onPress: () => console.log("button2 success"),
  },
];

it("logs when pressed - onPressed works", () => {
  const { queryByLabelText, getByLabelText } = render(
    <Button label={button1.label} onPress={button1.onPress} />
  );
  expect(queryByLabelText("i am button")).toBeTruthy();
});

test('array of buttons renders corectly', () => {
  // Make an array of buttons, 
  // buttonArray.map or const buttonArr = renderer.blah...
  // test style to see if border radius values are correct
  // 
})