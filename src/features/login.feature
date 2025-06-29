@login-feature
Feature: Login
As a user I want to verify that I can log in successfully

  Rule: User
    # Background:
    #   Given Open browser and navigate to the login page

    Scenario Outline: Verify user login successfully with user name have
      Given Open browser and navigate to the login page
      When The user enter the username "<email>" and password "<password>"
      And The user click the login button
      Then The user should be logged in and redirected to the dashboard successfully

      Examples:
        | email             | password |
        | admin@example.com |   123456 |
      # Then I should see the message "Login successful"
