@dashboard-feature
Feature: Dashboard
As a user, I want to verify the dashboard navigation works correctly

  Rule: User

    Scenario Outline: Verify user login successfully with user name have
      Given Open browser and navigate to the login page
      When The user enter the username "<email>" and password "<password>"
      And The user click the login button
      Then The user should be logged in and redirected to the dashboard successfully

      Examples:
        | email             | password |
        | admin@example.com |   123456 |
