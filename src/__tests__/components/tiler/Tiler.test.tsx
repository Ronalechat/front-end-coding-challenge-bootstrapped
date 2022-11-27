import Tiler from "../../../tiler/Tiler";
import { render, screen, fireEvent } from "@testing-library/react";



test("Tiler should render correctly", async () => {
  // expect(tiler).toBeVisible();
  const { baseElement } = render(<Tiler />);
  console.log(baseElement);
  expect(baseElement).toHaveAttribute('width', "500");
});

test("zoom in correctly by button", () => {
  render(<Tiler />);

  // zoom button
  fireEvent.click(screen.getByText("+"));
  // Render?
  // Target zoom button with text?
  // press zoom,
  // Expect to rerender.
});

test("zoom in correctly by mouse wheel", () => {
  render(<Tiler />);

  fireEvent.scroll(window, { target: { scrollY: 100 } });
  // Render?
  // Target zoom button with text?
  // press zoom,
  // Expect to rerender.
});

it("should pan when mousedown and drag", () => {
  // Mouse event down on the tiler element
  // Move mouse coords to desired position
  // Check element offset, etc... 
});
