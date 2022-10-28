import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./Signup";

const newUser = {
  name: "Harshit Khanna",
  email: "hk57@rice.edu",
  gender: "male",
  phone: 1234567890,
  password: "123456",
  confirmPassword: "123456",
};

describe("Validate New user", () => {
  render(
    <Router>
      <Signup />
    </Router>
  );

  const heading = screen.getByTestId("heading");

  const name = screen.getByLabelText("Name", {
    exact: false,
    selector: "input",
  });

  const email = screen.getByLabelText("Email", {
    exact: false,
    selector: "input",
  });

  const checkbox = screen.getByTestId("male_radio");

  const phone = screen.getByLabelText("Phone Number", {
    exact: false,
    selector: "input",
  });

  const password = screen.getByLabelText("Enter Password", {
    exact: false,
    selector: "input",
  });

  const confirmPassword = screen.getByTestId("confirm_register", {
    selector: "input",
  });

  const registerButton = screen.getByTestId("button_register");

  test("Page heading is correct", async () => {
    const headingText = heading.innerHTML.trim();

    expect(headingText).toBe("Register");
  });

  test("Authenticate correct user", async () => {
    sessionStorage.removeItem("loggedInUser");
    fireEvent.change(name, {
      target: {
        value: "Harshit",
      },
    });

    fireEvent.change(email, {
      target: {
        value: "hk57@rice.edu",
      },
    });

    fireEvent.click(checkbox);

    fireEvent.change(phone, {
      target: {
        value: "1234567890",
      },
    });

    fireEvent.change(password, {
      target: {
        value: "123456",
      },
    });

    fireEvent.change(confirmPassword, {
      target: {
        value: "123456",
      },
    });

    fireEvent.submit(registerButton);
    setTimeout(function () {
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      expect(loggedInUser).toBe(newUser);
    }, 50);
  });

  test("Don't authenticate incorrect user", async () => {
    sessionStorage.removeItem("loggedInUser");
    fireEvent.change(name, {
      target: {
        value: "Harshit",
      },
    });

    fireEvent.change(email, {
      target: {
        value: "hk57",
      },
    });

    fireEvent.change(phone, {
      target: {
        value: "1234567890",
      },
    });

    fireEvent.change(password, {
      target: {
        value: "123456",
      },
    });

    fireEvent.change(confirmPassword, {
      target: {
        value: "123456",
      },
    });

    fireEvent.submit(registerButton);

    setTimeout(function () {
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      expect(loggedInUser).toBe(null);
    }, 50);
  });
});
