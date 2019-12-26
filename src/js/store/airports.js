import api from '../services/apiService.js';

class Airports {
    constructor(api) {
        this.api = api;
        this.airports = null;
    }

    async init() {
        const response = await Promise.all([this.api.airports()]);

        this.airports = this.serializeAirports(response[0]);

        return this.airports;
    }

    serializeAirports(airports) {
        // { code: name, code: name  }
        let airportsMap = new Map();
        airports.forEach(airport => {
            let key = airport.code;
            let name = airport.name_translations.en;

            airportsMap.set(key, name);
        });
        return airportsMap;
    }

    getAirportNameByCode(code) {
        return this.airports.get(code);
    }
}

const airports = new Airports(api);

export default airports;