import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Post from "../components/Post";

describe("Post suite", () => {
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
      <Post
        id={registeredUser.id}
        body={"test post"}
        name={registeredUser.name}
      />
    </Router>
  );

  test("Post is rendered", async () => {
    screen.debug();
  });

  test("Post search is working", async () => {});
});
