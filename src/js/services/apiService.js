import axios from 'axios';
import config from './apiConfig';
import token from '../config'; // import a token number

class Api {
    constructor(config) {
        this.url = config.url;
        this.local = config.local;
    }
    async countries() {
        try {
            const response = await axios.get(`${this.url}/data/ru/countries.json`);
            return response.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    }
    async cities() {
        try {
            const response = await axios.get(`${this.url}/data/ru/cities.json`);
            return response.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    }
    async airports() {
        try {
            const response = await axios.get(`${this.url}/data/ru/airlines.json`);
            return response.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    }
    async getPrices(origin, destination, departureDate, returnDate) {
        try {
            const response = await axios.get(
                `${this.url}/v1/prices/cheap?origin=${origin}&destination=${destination}&depart_date=${departureDate}&return_date=${returnDate}&token=${token}
      `
            );
            return response.data;
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }
    }
}

const api = new Api(config);

export default api;