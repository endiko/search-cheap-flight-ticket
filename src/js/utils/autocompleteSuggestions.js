import outputHtmlSuggestions from './outputHtmlSuggestions';

// Suggestions function with autocomplete feature
const autocompleteSuggestions = (map, searchText) => {
  // create a container for futere suggested autocomplete cities
  let filteredContainer = document.createElement('ul');
  filteredContainer.classList.add('autocomplete-container');

  // Get matches to current search input
  const regex = new RegExp(`^${searchText}`, 'gi');
  if (map.has(searchText[0].toUpperCase())) {
    let matches = map
      .get(searchText[0].toUpperCase())
      .filter(name => name.match(regex))
      .map(str => str.slice(0, -6));

    let filtered = matches.length > 7 ? matches.slice(0, 7) : matches;
    filteredContainer.innerHTML = filtered.length
      ? outputHtmlSuggestions(filtered, searchText)
      : `<li class="autocomplete-item">Нет совпадений</li>`;

    return filteredContainer;
  }
  return false;
};

export default autocompleteSuggestions;
