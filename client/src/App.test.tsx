import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("Basic Render", () => {
  const { getByText } = render(<App />);
  const SearchHeader = getByText(/Github Search/i);
  expect(SearchHeader).toBeInTheDocument();
});

test("Search for Repos", async () => {
  render(<App />);
  expect(
    screen.queryByPlaceholderText("Search Github For Repositories")
  ).toBeTruthy();
  fireEvent.change(
    screen.getByPlaceholderText("Search Github For Repositories"),
    {
      target: { value: "banana" }
    }
  );
  fireEvent.click(screen.getByLabelText("search"));

  const results = await screen.findByTestId("results-container");
  expect(results).toHaveTextContent(/banana/i);
});
