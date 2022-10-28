import "@testing-library/jest-dom";

import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";

import { BrowserRouter as Router } from "react-router-dom";
import Profile from "./Profile";

describe("Validate New user", () => {
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
      <Profile />
    </Router>
  );

  const nameText = screen.getByTestId("name_text_profile");
  const emailText = screen.getByTestId("email_text_profile");
  const phoneText = screen.getByTestId("phone_text_profile");
  const passwordText = screen.getByTestId("password_text_profile");

  const name = screen.getByTestId("name_profile", {
    selector: "input",
  });
  const email = screen.getByTestId("email_profile", {
    selector: "input",
  });
  const phone = screen.getByTestId("phone_profile", {
    selector: "input",
  });
  const password = screen.getByTestId("password_profile", {
    selector: "input",
  });

  const updateButton = screen.getByTestId("button_profile");

  //   test("Page heading is correct", async () => {
  //     const headingText = heading.innerHTML.trim();

  //     expect(headingText).toBe("Register");
  //   });

  test("Check if user data updates", async () => {
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

    fireEvent.submit(updateButton);
  });
});
