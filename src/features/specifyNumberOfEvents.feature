Feature: Specify Number of Events

    Scenario: When user hasn’t specified a number, 32 events are shown by default.
        Given the user has not specified the number of events
        When the user opens the app
        Then 32 events should be displayed by default

    Scenario: User changes the number of events to be displayed
        Given 32 events should be displayed by default
        When the user selects a new number of events to be displayed
        Then the app displays the number of events the user entered
