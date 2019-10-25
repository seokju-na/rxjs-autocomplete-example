import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { GithubUserSearchResponse } from './models';

declare var process: any;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN as string;

export function fetchGithubUsers(query: string): Observable<GithubUserSearchResponse> {
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
  };

  return ajax
    .get(`https://api.github.com/search/users?q=${query}+in:login`, headers)
    .pipe(map(data => data.response));
}
