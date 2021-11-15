import { defineFeature, loadFeature } from 'jest-cucumber';
import axios from 'axios';

const feature = loadFeature('test/features/applicantGetAll.feature');

defineFeature(feature, (test) => {
  test('Get Applicant', ({ given, when, then }) => {
    let url: string;
    let response: any;
    let statusCode: number;

    given(
      /^the endpoint http:\/\/localhost:8080\/applicants is available$/,
      function () {
        url = 'http://localhost:8080/applicants';
      },
    );
    when(/^a get applicant request is sent$/, async function () {
      response = await axios.get(url);

      statusCode = response.status;
    });
    then(/^the result is success$/, function () {
      expect(statusCode).toBe(Number(200));
    });
  });
});
