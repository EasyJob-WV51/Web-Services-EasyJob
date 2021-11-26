export interface ApiTarget {
  getRepositories(githubName: string): Promise<string[]>;
}
