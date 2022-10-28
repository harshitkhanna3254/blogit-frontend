import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Posts from "../components/Posts";

describe("Posts Tests", () => {
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
      <Posts loggedInUser={registeredUser} newPost="abcdef" />
    </Router>
  );

  const searchInput = screen.getByTestId("search_input");

  test("All 10 initial posts are set", async () => {
    setTimeout(() => {
      const posts = JSON.parse(localStorage.getItem("postsTest"));
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      expect(posts.length).toBe(10);
    }, 50);
  });

  test("Post search is working", async () => {
    setTimeout(() => {
      const filteredPosts = JSON.parse(localStorage.getItem("filteredPosts"));

      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

      fireEvent.change(searchInput, {
        target: {
          value: "quia",
        },
      });

      expect(filteredPosts.length).toBe(3);
    }, 50);
  });
});
