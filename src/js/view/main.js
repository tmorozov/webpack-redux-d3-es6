import d3 from "d3";
import topojson from "topojson";
import geoProjection from "d3-geo-projection";
geoProjection(d3);

const width = 800;
const height = 600;

let projection = d3.geo.patterson()
    .scale(153)
    .translate([width / 2, height / 2])
    .precision(0.1);

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


function render(world) {
    "use strict";

    svg.insert("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);

    svg.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", path);
}

export default {
    render
};