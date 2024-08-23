import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListEmployeeComponent from "../src/components/ListEmployeeComponent";
import { cleanup } from "@testing-library/react";
import EmployeeService from "../src/services/EmployeeService";

test("SEARCH_BAR", async () => {
  const InitialData = [
    {
      firstName: "John",
      lastName: "Doe",
      emailId: "johndoe@example.com",
    },
    {
      firstName: "Jessica",
      lastName: "Doe",
      emailId: "jessica@example.com",
    },
    {
      firstName: "Franchesca",
      lastName: "fran",
      emailId: "franchesca@example.com",
    },
    {
      firstName: "Laura",
      lastName: "Gonzalez",
      emailId: "laura@example.com",
    },
  ];

  for (let item of InitialData) {
    await EmployeeService.createEmployee(item);
  }

  render(
    <MemoryRouter>
      <ListEmployeeComponent />
    </MemoryRouter>
  );

  // wait for content to be loaded
  await waitFor(() => {
    screen.getByText("johndoe@example.com");
  });

  // The search bar must exist with the correct placeholder
  expect(screen.getAllByPlaceholderText("Search").length).toBe(1);

  // The current number of results
  expect(screen.getAllByRole("listitem").length).toBe(4);

  const searchBox = screen.getByPlaceholderText("Search");

  // Type a few names and assert the values in the table
  fireEvent.change(searchBox, { target: { value: InitialData[0].firstName } });
  expect(screen.getAllByRole("listitem").length).toBe(1);
  expect(screen.getAllByText(InitialData[0].emailId).length).toBe(1);

  fireEvent.change(searchBox, { target: { value: InitialData[1].firstName } });
  expect(screen.getAllByRole("listitem").length).toBe(1);
  expect(screen.getAllByText(InitialData[1].emailId).length).toBe(1);

  // Query that does not exist
  fireEvent.change(searchBox, { target: { value: "dont exist" } });
  expect(screen.queryAllByRole("listitem").length).toBe(0);

  // Query that does not exist
  fireEvent.change(searchBox, { target: { value: "" } });
  expect(screen.queryAllByRole("listitem").length).toBe(4);
  expect(screen.getAllByText(InitialData[0].emailId).length).toBe(1);
  expect(screen.getAllByText(InitialData[1].emailId).length).toBe(1);
  expect(screen.getAllByText(InitialData[2].emailId).length).toBe(1);
  expect(screen.getAllByText(InitialData[3].emailId).length).toBe(1);

  // useful for, well, debugging.
  // screen.debug()

  // See this: https://github.com/testing-library/react-testing-library/issues/1216#issuecomment-1595684566
  // for reasoning behind this "cleanup"
  cleanup();
});
