
import { combineReducers } from 'redux';
import {GEO_ERROR, GEO_DATA, LOCATIONS_DATA, LOCATIONS_ERROR, LINKS_DATA, LINKS_ERROR} from '../actions/index';

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

const rootReducer = combineReducers({
    geoData,
    locations,
    links
});

export default rootReducer;
