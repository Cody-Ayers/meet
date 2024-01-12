# MEET APP

This is a (PWA) progressive web application using a test-driven development (TDD) technique
This app uses Google Calendar API to fetch upcoming events.

## Serverless Functions

- The Meet App will use the serverless functions for things such as user authentication, real-time data processing, event recommendations and scalability. It will also handle the backend process for my app.

## Feature User stories

- Feature 2: Show/Hide Event Details
  As an user,
  I should be able to toggle the visibility of event details,
  so that I can quickly focus on the essential information without unnecessary clutter.

- Feature 3: Specify Number of Events
  As an user,
  I should be able to specify the number of events to be displayed,
  so that I can see only the amount of events I want to see at a time.

- Feature 4: Use the App When Offline
  As a user,
  I should be able to use the app offline,
  so that I can access important information and features without requiring a constant internet connection.

- Feature 5: Add an App Shortcut to the Home Screen
  As a mobile device user,
  I should be able to add a shortcut to the app on my home screen,
  so that I can quickly access the app without going through multiple steps.

- Feature 6: Display Charts Visualizing Event Details
  As a user,
  I should be able to view charts that visualize event details,
  so that I can see the event details categorized

## Scenarios using Gherkin syntax

- Feature 2: Show/Hide Event Details

Scenario: An event element is collapsed by default.
Given the user is viewing the events
When the user opens the app
Then the event details for each event should be collapsed by default

Scenario: User can expand an event to see details.
Given the user is viewing the events with collapsed details
When the user chooses to expand a specific event
Then the details of that event should be visible

Scenario: User can collapse an event to hide details.
Given the user is viewing the events with expanded details
When the user chooses to collapse a specific event
Then the details of that event should be hidden

- Feature 3: Specify Number of Events

Scenario: When user hasn’t specified a number, 32 events are shown by default.
Given the user has not specified the number of events
When the user opens the app
Then 32 events should be displayed by default

Scenario: User can change the number of events displayed.
Given the user is viewing the events
When the user chooses to specify a different number of events
Then the app should display the selected number of events

- Feature 4: Use the App When Offline

Scenario: Show cached data when there’s no internet connection.
Given the user has previously accessed the app and cached data is available
When the user opens the app without an internet connection
Then the app should display the cached data

Scenario: Show error when user changes search settings (city, number of events).
Given the user is using the app with an internet connection
When the user changes search settings like city or number of events
Then the app should show an error message indicating the need for an internet connection

- Feature 5: Add an App Shortcut to the Home Screen

Scenario: User can install the meet app as a shortcut on their device home screen
Given the user has the meet app installed on their device
When the user chooses to add a shortcut to the home screen
Then a shortcut for the meet app should be added to the device home screen

- Feature 6: Display Charts Visualizing Event Details

Scenario: Show a chart with the number of upcoming events in each city.
Given the user is viewing the events
When the user chooses to view charts
Then the app should display a chart showing the number of upcoming events in each city
