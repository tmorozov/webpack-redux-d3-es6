import d3 from "d3";

export const GEO_ERROR = 'GEO_ERROR';
export const GEO_DATA = 'GEO_DATA';


function onGeoError(err) {
    return {
        type: GEO_ERROR,
        error: err
    };
}

function onGeoData(world) {
    return {
        type: GEO_DATA,
        world: world
    };
}

export function loadMapData() {
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

