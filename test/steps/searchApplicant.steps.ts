import { defineFeature, loadFeature } from 'jest-cucumber';
import axios from 'axios';

const feature = loadFeature('test/features/searchApplicant.feature');

defineFeature(feature, (test) => {
  test('Search Applicant', ({ given, when, then }) => {
    let url: string;
    let response: any;
    let statusCode: number;

    given(
      /^the endpoint http:\/\/localhost:8080\/search-applicants\/{keyword} is available$/,
      function () {
        url = 'http://localhost:8080/search-applicants/';
      },
    );
    when(
      /^a search applicant request is sent with keyword '([^"]*)'$/,
      async function (keyword: string) {
        url += keyword;
        response = await axios.get(url);
        statusCode = response.status;
      },
    );
    then(/^the result is success for search request$/, function () {
      expect(statusCode).toBe(Number(200));
    });
  });
});
