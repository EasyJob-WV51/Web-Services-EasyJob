import { ApiTarget } from '../target/api-target';
import { GithubApi } from '../adaptee/github-api';

export class GithubApiAdapter implements ApiTarget {
  githubApi: GithubApi;

  constructor(githubApi: GithubApi) {
    this.githubApi = githubApi;
  }

  public async getRepositories(githubName: string): Promise<string[]> {
    let result: string[];

    await this.githubApi
      .getRepositoriesForAUser(githubName)
      .then((response: any) => {
        result = response.data.map((repo: any) => repo.name);
      });

    return result;
  }
}
