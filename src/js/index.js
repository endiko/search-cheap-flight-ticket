import '../scss/main.scss';
import locations from './store/locations';
import prices from './store/prices';
import airports from './store/airports';
import formUI from './views/FormUI';

async function initApp() {
    await locations.init();
    await airports.init();
    formUI.getSuggestingLocations(locations.shortCitiesList);
}

async function getPrices(origin, destination, departureDate, returnDate) {
    await prices.fetchPrices(origin, destination, departureDate, returnDate);
    await Object.values(prices.prices).map(el => {
        el.airline_name = airports.getAirportNameByCode(el.airline);
    });
}

async function onFormSubmit() {
    const origin = formUI.origin.value,
        destination = formUI.destination.value,
        originCode = locations.getCityCodeFromValue(origin),
        destinationCode = locations.getCityCodeFromValue(destination),
        departureDate = formUI.getDateFromValue(formUI.departureDatePicker),
        returnDate = formUI.getDateFromValue(formUI.returnDatePicker),
        dep = formUI.getFullDateFromValue(formUI.departureDatePicker),
        ret = formUI.getFullDateFromValue(formUI.returnDatePicker);

    await getPrices(originCode, destinationCode, departureDate, returnDate);

    const pricesContainer = prices.showPrices(origin, destination, dep, ret);

    return pricesContainer;
}

document.addEventListener('DOMContentLoaded', e => {
    initApp();

    formUI.form.addEventListener('submit', e => {
        e.preventDefault();

        onFormSubmit();
    });

    let infoBtn = document.querySelector('.info');

    infoBtn.addEventListener('click', function (e) {
        let modal = document.querySelector('.modal-overlay');
        modal.style.display = 'block';

        let closeBtn = document.querySelector('.modal__icon');
        closeBtn.addEventListener('click', function (e) {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});
