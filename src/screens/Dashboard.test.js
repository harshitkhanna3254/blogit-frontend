import "@testing-library/jest-dom";

import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Friend from "../components/Friend";
import Dashboard from "./Dashboard";

describe("Dashboard tests", () => {
  const registeredUser = {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    address: {
      street: "Dayna Park",
      suite: "Suite 449",
      city: "Bartholomebury",
      zipcode: "76495-3109",
      geo: {
        lat: "24.6463",
        lng: "-168.8889",
      },
    },
    phone: "(775)976-6794 x41206",
    website: "conrad.com",
    company: {
      name: "Yost and Sons",
      catchPhrase: "Switchable contextually-based project",
      bs: "aggregate real-time technologies",
    },
  };
  sessionStorage.setItem("loggedInUser", JSON.stringify(registeredUser));

  render(
    <Router>
      <Dashboard />
    </Router>
  );

  const grid1 = screen.getByTestId("grid1");
  const grid2 = screen.getByTestId("grid2");
  const item1 = screen.getByTestId("item2");

  //   const friendComponent = screen.getByTestId("friendComponent");
  //   const postComponent = screen.getByTestId("postComponent");
  //   const statusComponent = screen.getByTestId("statusComponent");
  //   const newPostComponent = screen.getByTestId("newPostComponent");

  test("Dashboard is rendered", async () => {
    sessionStorage.setItem("loggedInUserIndex", 1);

    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    expect(grid2).toContainElement(item1);
    // expect(getByText()).toBeInTheDocument();
  });
});
