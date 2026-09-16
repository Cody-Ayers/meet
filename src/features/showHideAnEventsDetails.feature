Feature: Show/Hide Event Details

    Scenario: An event element is collapsed by default.
        Given the user is viewing the events
        When the user sees a list of events when the app opens
        Then the event details for each event should be collapsed by default

    Scenario: User can expand an event to see details.
        Given the user is viewing the events with collapsed details
        When the user chooses to expand a specific event
        Then the details of that event should be visible

    Scenario: User can collapse an event to hide details.
        Given the user is viewing the events with expanded details
        When the user chooses to collapse a specific event
        Then the details of that event should be hidden