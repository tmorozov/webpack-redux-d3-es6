import d3 from "d3";
import mainView from "./view/main";
import configureStore from "./store/store";
import {loadMapData} from "./actions/";

import topojson from "topojson";
import geoProjection from "d3-geo-projection";
geoProjection(d3);


const width = 800;
const height = 600;

let projection = d3.geo.patterson()
    .scale(153)
    .translate([width / 2, height / 2])
    .precision(.1);

let path = d3.geo.path()
    .projection(projection);

let graticule = d3.geo.graticule();

let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);


function render() {
    let geoData = store.getState().geoData;
    if(geoData.isValid) {

        svg.insert("path", ".graticule")
            .datum(topojson.feature(geoData.world, geoData.world.objects.land))
            .attr("class", "land")
            .attr("d", path);

        svg.insert("path", ".graticule")
            .datum(topojson.mesh(geoData.world, geoData.world.objects.countries, function(a, b) { return a !== b; }))
            .attr("class", "boundary")
            .attr("d", path);

    } else {
        svg.call(mainView);
    }
}

const store = configureStore();
store.subscribe(render);


store.dispatch(loadMapData());