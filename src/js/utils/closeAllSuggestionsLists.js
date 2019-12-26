/*close all autocomplete lists in the document, except the one passed as an argument:*/

const closeAllSuggestionsLists = listName => {
  let lists = document.querySelectorAll('.autocomplete-container');

  for (let i = 0; i < lists.length; i++) {
    if (lists[i] != listName) {
      lists[i].parentNode.removeChild(lists[i]);
    }
  }
};

export default closeAllSuggestionsLists;
