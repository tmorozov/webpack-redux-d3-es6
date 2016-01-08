
import { combineReducers } from 'redux';
import {GEO_ERROR, GEO_DATA,
    LOCATIONS_DATA, LOCATIONS_ERROR,
    LINKS_DATA, LINKS_ERROR,
    COUNTRY_NAMES_DATA, COUNTRY_NAMES_ERROR,
    CITY_NAMES_DATA, CITY_NAMES_ERROR,
    ZOOM} from '../actions/index';

function geoData(state = {
    isValid: false,
    world: {}
}, action = undefined) {
    "use strict";

    switch (action.type) {
        case GEO_DATA:
            return Object.assign({}, state, {
                world: action.world,
                isValid: true
            });
        case GEO_ERROR:
            //console.log(action.error);
            return Object.assign({}, state, {
                world: {},
                isValid: false
            });
        default:
            return state;
    }
}

function locations(state = [], action = undefined) {

    "use strict";

    switch (action.type) {
        case LOCATIONS_DATA:
            return action.locations;
        case LOCATIONS_ERROR:
            //console.log(action.error);
            return [];
        default:
            return state;
    }
}

function links(state = [], action = undefined) {

    "use strict";

    switch (action.type) {
        case LINKS_DATA:
            return action.links;
        case LINKS_ERROR:
            //console.log(action.error);
            return [];
        default:
            return state;
    }
}


function countryNames(state = {}, action = undefined) {

    "use strict";

    switch (action.type) {
        case COUNTRY_NAMES_DATA:
            return action.names.reduce((acc, cur) => {
                acc[cur.id] = cur;
                return acc;
            }, {});
        case COUNTRY_NAMES_ERROR:
            return {};
        default:
            return state;
    }
}

function cityNames(state = [], action = undefined) {

    "use strict";

    switch (action.type) {
        case CITY_NAMES_DATA:
            return action.names;
        case CITY_NAMES_ERROR:
            return [];
        default:
            return state;
    }
}

function zoomPan(state = {
    scale: 150,
    coordinates: [0, 0]
}, action = undefined) {
    "use strict";

    switch (action.type) {
        case ZOOM:
            return Object.assign({}, state, {
                scale: action.level,
                coordinates: action.coordinates
            });
        default:
            return state;
    }

}

const rootReducer = combineReducers({
    geoData,
    locations,
    links,
    countryNames,
    cityNames,
    zoomPan
});

export default rootReducer;
