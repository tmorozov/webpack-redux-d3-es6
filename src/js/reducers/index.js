
import { combineReducers } from 'redux';
import {GEO_ERROR, GEO_DATA} from '../actions/index';

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

const rootReducer = combineReducers({
    geoData
});

export default rootReducer;
