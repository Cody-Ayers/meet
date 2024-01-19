// src/__tests__/Event.test.js

import { render } from "@testing-library/react";
import Event from "../components/Event";
import mockData from "../mock-data";
import userEvent from "@testing-library/user-event";

describe("<Event /> component", () => {
  let EventComponent;
  const event = mockData[0];
  beforeEach(() => {
    EventComponent = render(<Event event={event} />);
  });

  test("has an event title", () => {
    expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
  });

  test("renders event time created", () => {
    expect(EventComponent.queryByText(event.created)).toBeInTheDocument();
  });

  test("renders event location", () => {
    expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
  });

  test("renders show details button", () => {
    expect(EventComponent.queryByText("Show Details")).toBeInTheDocument();
  });

  test("event details hidden by default", () => {
    const details = EventComponent.container.querySelector(".details");
    expect(details).not.toBeInTheDocument();
  });

  test("show details button clicked, show details section", async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByText("Show Details");
    await user.click(button);
    const details = EventComponent.container.querySelector(".details");
    expect(details).toBeInTheDocument();
  });

  test("hide details button clicked, hide details", async () => {
    const user = userEvent.setup();
    const showButton = EventComponent.queryByText("Show Details");
    const hideButton = EventComponent.queryByText("Hide Details");
    user.click("hideButton");
    expect(showButton).toBeInTheDocument();
    expect(hideButton).not.toBeInTheDocument();
  });
});
