import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 events are shown by default.", ({
    given,
    when,
    then,
  }) => {
    given("the user has not specified the number of events", () => {});

    let AppComponent;
    when("the user opens the app", () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      expect(EventListDOM).toBeInTheDocument();
    });

    then(/^(\d+) events should be displayed by default$/, async (arg0) => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems).toHaveLength(32);
      });
    });
  });

  test("User changes the number of events to be displayed", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given(/^(\d+) events should be displayed by default$/, async (arg0) => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems).toHaveLength(32);
      });
    });

    when(
      "the user selects a new number of events to be displayed",
      async () => {
        const user = userEvent.setup();
        const AppDOM = AppComponent.container.firstChild;
        const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
        const NumberOfEventsInput =
          within(NumberOfEventsDOM).queryByRole("textbox");

        await user.type(NumberOfEventsInput, "{backspace}{backspace}10");
      }
    );

    then("the app displays the number of events the user entered", () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      const allRenderedEventItems =
        within(EventListDOM).queryAllByRole("listitem");
      expect(allRenderedEventItems.length).toBeGreaterThan(0);
    });
  });
});
