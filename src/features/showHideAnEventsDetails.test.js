import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from "../App";
import Event from "../components/Event";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    let AppComponent;
    given("the user is viewing the events", () => {
      AppComponent = render(<App />);
    });

    when("the user sees a list of events when the app opens", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    then(
      "the event details for each event should be collapsed by default",
      () => {
        const AppDOM = AppComponent.container.firstChild;
        const eventDetails = AppDOM.querySelector(".details");
        expect(eventDetails).not.toBeInTheDocument();
      }
    );
  });

  test("User can expand an event to see details.", ({ given, when, then }) => {
    let EventComponent;
    let allEvents;
    given("the user is viewing the events with collapsed details", async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      expect(
        EventComponent.container.querySelector(".details")
      ).not.toBeInTheDocument();
    });

    when("the user chooses to expand a specific event", async () => {
      const showDetails = EventComponent.queryByText("show details");
      const user = userEvent.setup();
      await user.click(showDetails);
    });

    then("the details of that event should be visible", () => {
      expect(
        EventComponent.container.querySelector(".details")
      ).toBeInTheDocument();
    });
  });

  test("User can collapse an event to hide details.", ({
    given,
    when,
    then,
  }) => {
    let EventComponent;
    let allEvents;
    given("the user is viewing the events with expanded details", async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      const user = userEvent.setup();
      await user.click(EventComponent.queryByText("show details"));
      expect(
        EventComponent.container.querySelector(".details")
      ).toBeInTheDocument();
    });

    when("the user chooses to collapse a specific event", async () => {
      const hideDetails = EventComponent.queryByText("hide details");
      const user = userEvent.setup();
      await user.click(hideDetails);
    });

    then("the details of that event should be hidden", () => {
      expect(
        EventComponent.container.querySelector(".details")
      ).not.toBeInTheDocument();
    });
  });
});
