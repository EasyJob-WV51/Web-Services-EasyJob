Feature: Search Applicant with API

  Scenario: Search Applicant
    Given the endpoint http://localhost:8080/search-applicants/{keyword} is available
    When a search applicant request is sent with keyword 'software'
    Then the result is success for search request