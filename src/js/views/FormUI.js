import closeAllSuggestionsLists from '../utils/closeAllSuggestionsLists';
import autocompleteSuggestions from '../utils/autocompleteSuggestions';
import addActiveClassToItem from '../utils/addActiveClassToItem';
import datepicker from '../utils/datepicker/datepicker';

class FormUI {
  constructor() {
    // main form elements
    this.form = document.forms['search-form'];
    this.origin = this.form.elements['origin'];
    this.destination = this.form.elements['destination'];
    this.departureDate = this.form.elements['departure-date'];
    this.returnDate = this.form.elements['return-date'];
    this.ticketAmount = this.form.elements['ticket-amount'];

    // other variables
    this.searchInputs = this.form.querySelectorAll(`input[type='search']`);
    this.departureDatePicker = datepicker(this.departureDate);
    this.returnDatePicker = datepicker(this.returnDate);
  }

  getSuggestingLocations(citiesListMap) {
    let currentActivePosition = null;
    this.searchInputs.forEach(input => {
      input.addEventListener('input', function(e) {
        closeAllSuggestionsLists(this);

        if (!this.value) return false;

        currentActivePosition = -1;

        let searchText = this.value;

        let matchesList = autocompleteSuggestions(citiesListMap, searchText);

        // execute a function when someone clicks on the item value (li element)
        matchesList.addEventListener('click', function(e) {
          input.value = e.target.getElementsByTagName('input')[0].value; // insert the value for the autocomplete text field

          closeAllSuggestionsLists(); /*close the list of autocompleted values, (or any other open lists of autocompleted values:*/
        });

        input.parentNode.appendChild(matchesList);
      });

      input.addEventListener('keydown', function(e) {
        let listItems = document.querySelectorAll('.autocomplete-item');

        if (e.keyCode == 40) {
          // If the arrow DOWN key is pressed
          currentActivePosition++;
          // console.log('form ui: ', currentActivePosition);
          addActiveClassToItem(listItems, currentActivePosition);
        } else if (e.keyCode == 38) {
          // If the arrow UP key is pressed
          currentActivePosition--;
          addActiveClassToItem(listItems, currentActivePosition);
        } else if (e.keyCode == 13) {
          // If the ENTER key is pressed
          e.preventDefault();

          if (currentActivePosition > -1) {
            if (listItems.length) {
              listItems[currentActivePosition].click(); // simulate a click on the "active" item
              currentActivePosition = -1;
            }
          }
        }
      });
    });
  }
  getDateFromValue(value) {
    return new Date(value.dateSelected).toISOString().slice(0, 7);
  }
  getFullDateFromValue(value) {
    return new Date(value.dateSelected).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  }
}

const formUI = new FormUI();

export default formUI;
