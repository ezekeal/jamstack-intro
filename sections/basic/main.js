const listRepos = async username => {
  const repos = await fetch(`https://api.github.com/users/${username}/repos?type=owner&sort=updated`)
    .then(res => res.json())
    .catch(error => console.error(error));

  if(!Array.isArray(repos)) {
    render(`<p>no results found for ${username}</p>`);
  }

  const markup = repos
  .map(
    repo => `
    <li>
      <a href="${repo.html_url}"'>${repo.name}</a>
      (⭐️ ${repo.stargazers_count})
    </li>
    `
  )
  .join('');

  render(markup);
}

const usernameInput = document.querySelector('#username-input');
const usernameSearchButton = document.querySelector('#username-search-button');
const contentArea = document.querySelector('#content');

const render = markup => content.innerHTML = `<ul>${markup}</ul>`;
const getUsername = () => usernameInput.value;

usernameSearchButton.addEventListener('click', () => listRepos(getUsername()));
usernameInput.addEventListener('keypress', e => e.key === 'Enter' && listRepos(getUsername()));
