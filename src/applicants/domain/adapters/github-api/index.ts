import { GithubApiAdapter } from './adapter/github-api.adapter';
import { GithubApi } from './adaptee/github-api';
const githubApiAdapter: GithubApiAdapter = new GithubApiAdapter(
  new GithubApi(),
);

async function getRepos(): Promise<string[]> {
  const result: string[] = await githubApiAdapter
    .getRepositories('SebastianBran')
    .then((response: string[]) => {
      return response;
    });

  return result;
}

console.log('hola');


