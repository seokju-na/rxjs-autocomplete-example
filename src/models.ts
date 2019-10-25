export interface GithubUserResponse {
  avatar_url: string;
  login: string;
  html_url: string;
}

export interface GithubUserSearchResponse {
  total_count: number;
  items: GithubUserResponse[];
}
