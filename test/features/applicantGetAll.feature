Feature: Get Applicant with API

  Scenario: Get Applicant
    Given the endpoint http://localhost:8080/applicants is available
    When a get applicant request is sent
    Then the result is success
