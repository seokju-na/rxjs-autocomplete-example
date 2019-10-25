import { fromEvent, merge, of } from 'rxjs';
import { catchError, debounceTime, exhaustMap, filter, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fetchGithubUsers } from './api';
import { GithubUserResponse } from './models';
import { destroyAutocomplete, renderSearchResult } from './renders';

const searchInput = document.getElementById('search');

function createAutocomplete() {
  return fromEvent(searchInput, 'keyup').pipe(
    map(event => (event.target as HTMLInputElement).value),
    debounceTime(150),
    filter(query => query !== ''),
    switchMap(query => fetchGithubUsers(query).pipe(
      map(response => response.items),
      catchError(() => of([])),
    )),
    takeUntil(
      fromEvent(searchInput, 'keydown').pipe(
        filter(event => (event as KeyboardEvent).key === 'Escape'),
      ),
    ),
    tap(users => renderSearchResult(users as GithubUserResponse[])),
    finalize(() => destroyAutocomplete()),
  );
}

merge(
  fromEvent(searchInput, 'focus'),
  fromEvent(searchInput, 'keypress'),
).pipe(
  exhaustMap(() => createAutocomplete()),
).subscribe();
