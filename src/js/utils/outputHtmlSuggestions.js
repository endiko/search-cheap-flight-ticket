// Show results in HTML
const outputHtmlSuggestions = (matches, searchText) => {
  if (matches.length) {
    const html = matches
      .map(
        match => `
            <li class="autocomplete-item">
                <b>${match.slice(0, searchText.length)}</b>${match.slice(
          searchText.length
        )}
                <input type="hidden" value="${match}">
            </li>
        `
      )
      .join('');
    return html;
  }
};

export default outputHtmlSuggestions;
