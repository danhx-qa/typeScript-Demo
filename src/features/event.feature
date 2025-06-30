@event-feature
Feature: Event
As a user I want to verify that Calendar navigation in Events screen

  Rule: User
    #Precondition of testcase

    Background:
      Given Open browser and navigate to the login page
      When The user enter the username "admin@example.com" and password "123456"
      And The user click the login button
      Then The user should be logged in and redirected to the dashboard successfully
    #Tag dùng để phân biệt sau này muốn run testcase dựa vào tag đã gán cho Scenario

    @tcs-01A
    Scenario Outline: Navigate to next weeks and return to today
      Given The user navigates to the "Events" screen
      When The user clicks the '<typeButton>' button more than '<times>' times
      Then The calendar should display the correct '<typeButton>' month <times> with format "MMMM YYYY"
        #Data test, mỗi row sẽ tương đương với 1 case (Rất phù hợp với các case validation data)
        #Data input theo title row

      Examples:
        | typeButton | times |
        | next       |     1 |
        | prev       |     1 |

    @tcs-01B
    Scenario Outline: Navigate to next weeks and return to today
      Given The user navigates to the "Events" screen
      When The user clicks the '<typeButton>' button more than '<times>' times
      And clicks the "today" button
      Then The calendar should display the correct '<typeButton>' month 0 with format "MMMM YYYY"

      Examples:
        | typeButton | times |
        | next       |     3 |

    @tcs-02
    Scenario Outline: Navigate to next weeks and return to today
      Given The user navigates to the "Events" screen
      When clicks the '<groupButton>' button
      Then The calendar should display the correct '<groupButton>' month 0 with format '<formatDate>'

      Examples:
        | groupButton | formatDate   |
        | week        | MMM D        |
        | day         | MMMM D, YYYY |
        | month       | MMMM YYYY    |

    @tcs-03
    Scenario Outline: User adds a new event on the last day of the current month
      Given The user navigates to the "Events" screen
      When The user selects the last day of the current month
      Then The Add Event modal should be "Add event" title displayed
      When Enters event information with '<title>','<startDate>','<description>','<startTime>','<endDate>','<endTime>','<location>','<label>','<client>','<sharedWith>'
      And clicks the " Save" button
      Then The event should be added successfully with '<title>','<startDate>','<description>','<startTime>','<endDate>','<endTime>','<location>','<label>','<client>','<sharedWith>'

      Examples:
        | title             | startDate  | description      | startTime | endDate    | endTime | location              | label | client | sharedWith |
        | Test Event TCS-03 | 2025-06-30 | Test Description |   7:00 AM | 2025-06-30 | 9:00 PM | 212 Hai Chau, Da Nang |       | OpenAI | Only me    |

    @tcs-04
    Scenario Outline: User input on the required field
      Given The user navigates to the "Events" screen
      When The user clicks the Add Event button
      Then The Add Event modal should be "Add event" title displayed
      When clicks the " Save" button
      Then The validation error message should be displayed for the "This field is required." field

    @tcs-05A
    Scenario Outline: Add new event successfully with required field
      Given The user navigates to the "Events" screen
      When The user clicks the Add Event button
      And Enters event information with required field '<title>','<startDate>'
      And clicks the " Save" button
      Then The event should be added successfully with '<title>','<startDate>'

      Examples:
        | title              | startDate  |
        | Test Event TCS-05A | 2025-06-20 |

    @tcs-05B
    Scenario Outline: Add new event successfully with all field
      Given The user navigates to the "Events" screen
      When The user clicks the Add Event button
      And Enters event information with '<title>','<startDate>','<description>','<startTime>','<endDate>','<endTime>','<location>','<label>','<client>','<sharedWith>'
      And clicks the " Save" button
      Then The event should be added successfully with '<title>','<startDate>','<description>','<startTime>','<endDate>','<endTime>','<location>','<label>','<client>','<sharedWith>'

      Examples:
        | title              | startDate  | description      | startTime | endDate    | endTime | location              | label | client | sharedWith |
        | Test Event TCS-05B | 2025-06-25 | Test Description |   7:00 AM | 2025-06-30 | 9:00 PM | 212 Hai Chau, Da Nang |       | OpenAI | Only me    |

    @tcs-06
    Scenario Outline: Add Event modal cannot be closed by clicking outside
      Given The user navigates to the "Events" screen
      When The user selects the current day of the current month
      Then The Add Event modal should be "Add event" title displayed
      When The user clicks outside the Add Event modal
      Then The Add Event modal should be "Add event" title displayed

    @tcs-07
    Scenario Outline: Add Event modal should close when clicking the Close button
      Given The user navigates to the "Events" screen
      When The user selects the current day of the current month
      Then The Add Event modal should be "Add event" title displayed
      When The user clicks the Close button on the modal
      Then The Add Event modal should be "Add event" title undisplayed

    @tcs-08
    Scenario Outline: Delete an existing event successfully
      Given The user navigates to the "Events" screen
      When The user clicks the Add Event button
      And Enters event information with required field '<title>','<startDate>'
      And clicks the " Save" button
      Then The event should be added successfully with '<title>','<startDate>'
      When The user deletes the event
      Then The event titled '<startDate>' should no longer be visible
      And A yellow success message '<message>' should be displayed

      Examples:
        | title             | startDate  | message                     |
        | Test Event TCS-08 | 2025-06-22 | The event has been deleted. |
