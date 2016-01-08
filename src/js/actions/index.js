import d3 from "d3";

export const GEO_ERROR = 'GEO_ERROR';
export const GEO_DATA = 'GEO_DATA';
export const LOCATIONS_DATA = 'LOCATIONS_DATA';
export const LOCATIONS_ERROR = 'LOCATIONS_ERROR';
export const LINKS_DATA = 'LINKS_DATA';
export const LINKS_ERROR = 'LINKS_ERROR';
export const COUNTRY_NAMES_ERROR = 'COUNTRY_NAMES_ERROR';
export const COUNTRY_NAMES_DATA = 'COUNTRY_NAMES_DATA';
export const CITY_NAMES_ERROR = 'CITY_NAMES_ERROR';
export const CITY_NAMES_DATA = 'CITY_NAMES_ERROR';

export const ZOOM = 'ZOOM';

export function zoom(level = 150, coordinates = [0, 0]) {
    "use strict";
    return {
        type: ZOOM,
        level: level,
        coordinates: coordinates
    };
}

export function loadMapData() {
    "use strict";

    return dispatch => {

        d3.json("/world-50m.json", function(error, world) {
            if (error) {
                dispatch({
                    type: GEO_ERROR,
                    error: error
                });
            } else {
                dispatch({
                    type: GEO_DATA,
                    world: world
                });
            }
        });
    };
}


export function loadLocations() {
    "use strict";

    return dispatch => {

        d3.json("/locations.json", function(error, locations) {
            if (error) {
                dispatch({
                    type: LOCATIONS_ERROR,
                    error: error
                });
            } else {
                dispatch({
                    type: LOCATIONS_DATA,
                    locations: locations
                });
            }
        });
    };
}



export function loadLinks() {
    "use strict";

    return dispatch => {

        d3.json("/links.json", function(error, locations) {
            if (error) {
                dispatch({
                    type: LINKS_ERROR,
                    error: error
                });
            } else {
                dispatch({
                    type: LINKS_DATA,
                    links: locations
                });
            }
        });
    };
}


//---- Country Names

export function loadCountryNames() {
    "use strict";

    return dispatch => {

        d3.tsv("/world-country-names.tsv", function(error, names) {
            if (error) {
                dispatch({
                    type: COUNTRY_NAMES_ERROR,
                    error: error
                });
            } else {
                dispatch({
                    type: COUNTRY_NAMES_DATA,
                    names: names
                });
            }
        });
    };
}

// --- City names

export function loadCityNames() {
    "use strict";

    return dispatch => {

        d3.tsv("/cities15000.txt", function(error, names) {
            if (error) {
                dispatch({
                    type: CITY_NAMES_ERROR,
                    error: error
                });
            } else {
                dispatch({
                    type: CITY_NAMES_DATA,
                    names: names.map( (city)=>{
                        return {
                            id: city.geonameid,
                            name: city.asciiname,
                            coordinates: [+city.longitude, +city.latitude],
                            population: +city.population
                        };
                    })
                });
            }
        });
    };
}

