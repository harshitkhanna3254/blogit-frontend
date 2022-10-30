import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Friend from "./Friend";

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

  test("Remove a friend", async () => {
    const mockFn = jest.fn();

    render(
      <Router>
        <Friend
          name={registeredUser.name}
          id={registeredUser.id}
          username={registeredUser.username}
          unfollowFriend={mockFn}
        />
      </Router>
    );

    const removeFriend = screen.getByTestId("button_removeFriend");

    fireEvent.click(removeFriend);

    const friends = JSON.parse(localStorage.getItem("friendsAfterRemoving"));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
