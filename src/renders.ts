import { GithubUserResponse } from './models';

const autocomplete = document.getElementById('autocomplete');
const searchResult = autocomplete.querySelector('#search-result')!;

export function initAutocomplete() {
  autocomplete.removeAttribute('style');
  searchResult.innerHTML = '';
}

export function destroyAutocomplete() {
  autocomplete.setAttribute('style', 'display: none;');
  searchResult.innerHTML = '';
}

export function renderSearchResult(users: any) {
  initAutocomplete();

  for (const user of users) {
    const item = createSearchResultItem(user);
    searchResult.appendChild(item);
  }
}

function createSearchResultItem(user: GithubUserResponse) {
  const item = document.createElement('li');
  const profile = document.createElement('img');
  const name = document.createElement('a');

  profile.src = user.avatar_url;
  name.href = user.html_url;
  name.target = '_blank';
  name.innerText = user.login;

  item.appendChild(profile);
  item.appendChild(name);

  return item;
}
