import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "./Login";

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

describe("Validate Authentication", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const username = screen.getByLabelText("Username", {
    exact: false,
    selector: "input",
  });
  const password = screen.getByLabelText("Password", {
    exact: false,
    selector: "input",
  });
  const signInButton = screen.getByTestId("button_login");

  test("Login a user from JSON data", async () => {
    fireEvent.change(username, {
      target: {
        value: "Delphine",
      },
    });

    fireEvent.change(password, {
      target: {
        value: "Dayna Park",
      },
    });

    fireEvent.submit(signInButton);
    setTimeout(function () {
      const loggedInUserIndex = sessionStorage.getItem("loggedInUserIndex");
      expect(loggedInUserIndex).toBe(8);
    }, 50);
  });

  test("Login fail for invalid user", () => {
    sessionStorage.removeItem("loggedInUserIndex");
    fireEvent.change(username, {
      target: {
        value: "abcdefgh",
      },
    });

    fireEvent.change(password, {
      target: {
        value: "12345678",
      },
    });

    fireEvent.submit(signInButton);
    setTimeout(function () {
      const loggedInUserIndex = sessionStorage.getItem("loggedInUserIndex");
      const loggedInUser = JSON.parse(
        sessionStorage.getItem("loggedInUserIndex")
      );
      expect(loggedInUserIndex).toBe(null);
      expect(loggedInUser).toBe(registeredUser);
    }, 100);
  });

  test("Login fail for Incorrect Password", () => {
    sessionStorage.removeItem("loggedInUserIndex");
    fireEvent.change(username, {
      target: {
        value: "Delphine",
      },
    });

    fireEvent.change(password, {
      target: {
        value: "12345678",
      },
    });

    fireEvent.submit(signInButton);
    setTimeout(function () {
      const loggedInUserIndex = sessionStorage.getItem("loggedInUserIndex");
      expect(loggedInUserIndex).toBe(null);
    }, 100);
  });
});
