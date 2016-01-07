import d3 from "d3";

export const GEO_ERROR = 'GEO_ERROR';
export const GEO_DATA = 'GEO_DATA';
export const LOCATIONS_DATA = 'LOCATIONS_DATA';
export const LOCATIONS_ERROR = 'LOCATIONS_ERROR';
export const LINKS_DATA = 'LINKS_DATA';
export const LINKS_ERROR = 'LINKS_ERROR';


function onGeoError(err) {
    "use strict";

    return {
        type: GEO_ERROR,
        error: err
    };
}

function onGeoData(world) {
    "use strict";

    return {
        type: GEO_DATA,
        world: world
    };
}

export function loadMapData() {
    "use strict";

    return dispatch => {

        d3.json("/world-50m.json", function(error, world) {
            if (error) {
                dispatch(onGeoError(error));
            } else {
                dispatch(onGeoData(world));
            }
        });
    };
}


function onLocationsError(err) {
    "use strict";

    return {
        type: LOCATIONS_ERROR,
        error: err
    };
}

function onLocationsData(locations) {
    "use strict";

    return {
        type: LOCATIONS_DATA,
        locations: locations
    };
}

export function loadLocations() {
    "use strict";

    return dispatch => {

        d3.json("/locations.json", function(error, locations) {
            if (error) {
                dispatch(onLocationsError(error));
            } else {
                dispatch(onLocationsData(locations));
            }
        });
    };
}

function onLinksError(err) {
    "use strict";

    return {
        type: LINKS_ERROR,
        error: err
    };
}

function onLinksData(links) {
    "use strict";

    return {
        type: LINKS_DATA,
        links: links
    };
}

export function loadLinks() {
    "use strict";

    return dispatch => {

        d3.json("/links.json", function(error, locations) {
            if (error) {
                dispatch(onLinksError(error));
            } else {
                dispatch(onLinksData(locations));
            }
        });
    };
}

