import d3 from "d3";
import topojson from "topojson";
import geoProjection from "d3-geo-projection";
geoProjection(d3);

const width = 800;
const height = 600;

let projection = d3.geo.patterson()
    //.scale(153)
    .translate([width / 2, height / 2])
    .precision(0.1);

let path = d3.geo.path()
    .projection(projection);

let graticule = d3.geo.graticule();

let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


let land = svg.append("path")
    .attr("class", "land");

let boundary = svg.append("path")
    .attr("class", "boundary");

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

let layer1_likns = svg.append('g');
let layer2_locations = svg.append('g');

function render(state) {
    "use strict";

    if(state.geoData.isValid) {
        let world = state.geoData.world;

        land.datum(topojson.feature(world, world.objects.land))
            .attr("d", path);

        boundary.datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
            .attr("d", path);
    }


    let links = layer1_likns.selectAll(".links")
        .data(state.links);

    links.enter().append("line")
        .attr("x1", d => projection(d.from)[0])
        .attr("y1", d => projection(d.from)[1])
        .attr("x2", d => projection(d.to)[0])
        .attr("y2", d => projection(d.to)[1])
        .attr("stroke-width", 1)
        .attr("stroke", "blue");

    links.exit().remove();



    let locations = layer2_locations.selectAll(".location")
        .data(state.locations);

    locations.enter().append("svg:circle")
        .attr("class", "location")
        .attr("cx", d => projection(d.coordinates)[0])
        .attr("cy", d => projection(d.coordinates)[1])
        .attr("stroke", "blue")
        .attr("fill", "#fff")
        .attr("r", 2);

    locations.exit().remove();

}

export default {
    render
};