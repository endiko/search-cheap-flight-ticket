import api from '../services/apiService.js';

class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
    }

    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities()
        ]);

        const [countries, cities] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        return this.cities;
    }

    createShortCitiesList(cities) {
        // { 'A': ['City, country', 'City, Country'], 'B': ['City, Country', 'City, Country'], ...}
        let locationsMap = new Map();

        Object.keys(cities).forEach(location => {
            let key = location[0];

            if (locationsMap.has(key)) {
                locationsMap.get(key).push(location);
            } else {
                locationsMap.set(key, [location]);
            }
        });

        return locationsMap;
    }

    serializeCountries(countries) {
        //  { 'Country code': { ... } }
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }

    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            const countryName = this.getCountryNameByCityCode(city.country_code);
            acc[
                `${city.name || city.name_translations.en}, ${countryName} | ${
                city.code
                }`
            ] = city;
            return acc;
        }, {});
    }

    getCountryNameByCityCode(code) {
        //  { 'Country code': { ... } }
        return this.countries[code].name;
    }

    getCityCodeFromValue(value) {
        let key = value[0];
        if (this.shortCitiesList.has(key)) {
            return this.shortCitiesList
                .get(key)
                .filter(str => str.includes(value))[0]
                .slice(value.length + 3);
        }
    }
}

const locations = new Locations(api);

export default locations;