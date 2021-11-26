import axios from 'axios';

export class GithubApi {
  BASE_URL = 'https://api.github.com/users/';

  public getRepositoriesForAUser(githubName: string) {
    return axios.get(`${this.BASE_URL}${githubName}/repos`);
  }
}
