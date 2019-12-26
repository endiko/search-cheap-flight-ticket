import api from '../services/apiService.js';

class Prices {
    constructor(api) {
        this.api = api;
        this.prices = null;
        this.currency = null;
    }

    async fetchPrices(origin, destination, departureDate, returnDate) {
        const response = await api.getPrices(
            origin,
            destination,
            departureDate,
            returnDate
        );
        this.currency = response.currency;
        this.prices = Object.values(response.data)[0] || [];

        return response;
    }

    createOutputHTML(element, origin, destination) {
        return `
    <li class="search-result__item">
      <div class="search-result-item__top">
        <div class="search-result-item-top__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 367.92 367.92" class="svg airline__icon">
            <path d="M367.851 6.944c-.056-.424-.12-.832-.248-1.248-.136-.456-.32-.872-.528-1.296-.112-.232-.152-.48-.288-.704-.088-.144-.232-.24-.336-.376-.264-.368-.576-.688-.904-1.016-.328-.328-.656-.632-1.032-.896-.136-.096-.224-.232-.36-.312-.224-.136-.472-.168-.704-.28-.44-.216-.872-.4-1.336-.536-.392-.104-.776-.16-1.176-.208-.472-.056-.928-.088-1.4-.064-.44.024-.864.112-1.296.216-.272.064-.552.04-.824.136l-352 120c-3.184 1.072-5.352 4.04-5.416 7.408-.064 3.368 1.984 6.416 5.136 7.624l164.456 63.192 71.064 164.512c1.272 2.936 4.168 4.824 7.344 4.824.136 0 .264 0 .4-.008 3.336-.168 6.208-2.384 7.224-5.56l112-352c.08-.248.056-.504.104-.76.096-.448.168-.88.184-1.336.016-.448-.008-.872-.064-1.312zM31.475 128.368L330.011 26.592 173.619 182.984 31.475 128.368zm215.384 208.744l-61.76-142.976L342.403 36.824l-95.544 300.288z"/>
            <path d="M125.659 242.264c-3.128-3.128-8.184-3.128-11.312 0l-112 112c-3.128 3.128-3.128 8.184 0 11.312 1.56 1.56 3.608 2.344 5.656 2.344s4.096-.784 5.656-2.344l112-112c3.128-3.128 3.128-8.184 0-11.312zM146.347 298.264l-56 56c-3.128 3.128-3.128 8.184 0 11.312 1.56 1.56 3.608 2.344 5.656 2.344 2.048 0 4.096-.784 5.656-2.344l56-56c3.128-3.128 3.128-8.184 0-11.312s-8.184-3.128-11.312 0zM8.003 279.92c2.048 0 4.096-.784 5.656-2.344l56-56c3.128-3.128 3.128-8.184 0-11.312s-8.184-3.128-11.312 0l-56 56c-3.128 3.128-3.128 8.184 0 11.312 1.56 1.56 3.608 2.344 5.656 2.344z"/>
            </svg>
        </div>
        <span class="search-result-item-top__name">
          ${element.airline_name} (${element.airline})
        </span>
        <span class="search-result-item-top__number">Рейс: ${
            element.flight_number
            }</span>
      </div>
      <div class="search-result-item__main">
        <div class="flight__info">
          <div class="flight-location__wrapper">
            <span class="flight-location__name"> ${origin}</span>
            
            <span class="flight-location__name"> ${destination}</span>
          </div>
            <div class="flight__time departure">
            ${new Date(element.departure_at).toLocaleTimeString('ru-Ru', {
                hour: 'numeric',
                minute: 'numeric'
            })}
            </div>
            <div class="flight__date departure">
            ${new Date(element.departure_at).toLocaleDateString('ru-Ru', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })}
            </div>
        </div>
        <div class="flight__info">
          <div class="flight-location__wrapper">
            <span class="flight-location__name"> ${destination}</span>
            
            <span class="flight-location__name"> ${origin}</span>
          </div>
            <div class="flight__time return">
            ${new Date(element.return_at).toLocaleTimeString('ru-Ru', {
                hour: 'numeric',
                minute: 'numeric'
            })}
            </div>
            <div class="flight__date return">
            ${new Date(element.return_at).toLocaleDateString('ru-Ru', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })}
            </div>
        </div>
      </div>
      <div class="flight__price">${
            element.price
            }&nbsp;<small>&#8381;</small></div>
    </li>
    `;
    }

    showPrices(origin, destination, departureDate, returnDate) {
        const resultArray = Object.values(this.prices);
        const pricesContainer = document.querySelector('.search-result__list');
        const resultMessage = document.querySelector('.search-result__message');
        pricesContainer.innerHTML = '';
        resultMessage.innerHTML = '';

        if (resultArray.length) {
            resultArray.forEach(element => {
                let temp = this.createOutputHTML(element, origin, destination);
                pricesContainer.innerHTML += temp;
            });
            resultMessage.innerHTML = `
      За выбранный период ${departureDate} - ${returnDate} нашлись следующие варианты:
    `;
        } else {
            resultMessage.innerHTML = `
      За выбранный период ${departureDate} - ${returnDate} ничего не нашлось
    `;
        }
    }
}

const prices = new Prices(api);

export default prices;