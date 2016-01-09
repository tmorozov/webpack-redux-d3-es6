import store from "../store/store";
//import {zoom} from "../actions/index";

import d3 from "d3";
import topojson from "topojson";
import geoProjection from "d3-geo-projection";
geoProjection(d3);

const width = 800;
const height = 600;
const scale0 = (width - 1) / 2 / Math.PI;

let projection = d3.geo.patterson();

let zoom = d3.behavior.zoom()
    .translate([width / 2, height / 2])
    .scale(scale0)
    .scaleExtent([scale0, 60 * scale0])
    .on("zoom", zoomed);

let path = d3.geo.path()
    .projection(projection);

let svg = d3.select("#main").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

let g = svg.append("g");
let layer_countries = g.append("g");
let layer_cities = g.append("g");
let layer_links = g.append("g");
let layer_locations = g.append("g");

svg
    .call(zoom)
    .call(zoom.event);

let tooltip = d3.select("#main").append("div")
    .attr("class", "tooltip");

function render(state) {
    "use strict";

    if(state.geoData.isValid) {
        let world = state.geoData.world;

        let countries = topojson.feature(world, world.objects.countries).features;

        let country = layer_countries.selectAll(".country")
            .data(countries);

        country
            .enter()
            .insert("path")
            .attr("class", "country")
            .attr("title", function(d) { return d.name; });

        country.attr("d", path);

        //// Show/hide tooltip
        //country
        //    .on("mousemove", d => {
        //        var mouse = d3.mouse(svg.node());
        //
        //        tooltip
        //            .classed("hidden", false)
        //            .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
        //            .html(state.countryNames[d.id]? state.countryNames[d.id].name : "");
        //    })
        //    .on("mouseout", () => tooltip.classed("hidden", true) );

    }


    let links = layer_links.selectAll(".link").data(state.links);
    links.enter()
        .append("line")
        .attr("class", "link")
        .attr("stroke-width", 1)
        .attr("stroke", "blue");
    links.attr("x1", d => projection(d.from)[0])
        .attr("y1", d => projection(d.from)[1])
        .attr("x2", d => projection(d.to)[0])
        .attr("y2", d => projection(d.to)[1]);
    links.exit().remove();


    let locations = layer_locations.selectAll(".location").data(state.locations);
    locations.enter()
        .append("svg:circle")
        .attr("class", "location")
        .attr("stroke", "blue")
        .attr("fill", "#fff")
        .attr("r", 4);
    locations
        .attr("cx", d => projection(d.coordinates)[0])
        .attr("cy", d => projection(d.coordinates)[1])
        .on("mousemove", d => {
            var mouse = d3.mouse(svg.node());
            tooltip
                .classed("hidden", false)
                .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
                .html(d.name);
        })
        .on("mouseout",  () => tooltip.classed("hidden", true) );

    locations.exit().remove();


    let topLeft = projection.invert([0,0]);
    let bottomRight = projection.invert([width,height]);
    let minPopulation = 10000000 * scale0 / (2 * zoom.scale() ); // 10M

    //let state = store.getState();
    let filteredCityNames = state.cityNames.filter(city => {
        return city.population > minPopulation &&
            city.coordinates[0]>topLeft[0] &&
            city.coordinates[1]<topLeft[1] &&
            city.coordinates[0]<bottomRight[0] &&
            city.coordinates[1]>bottomRight[1];
    });

    let cities = layer_cities.selectAll(".city").data(filteredCityNames);

    cities.enter()
        .append("svg:circle")
        .attr("class", "city")
        .attr("stroke", "yellow")
        .attr("fill", "yellow")
        .attr("r", 4);
    cities
        .attr("cx", d => projection(d.coordinates)[0])
        .attr("cy", d => projection(d.coordinates)[1])
        .on("mousemove", d => {
            var mouse = d3.mouse(svg.node());
            tooltip
                .classed("hidden", false)
                .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
                .html(d.name);
        })
        .on("mouseout",  () => tooltip.classed("hidden", true) );

    cities.exit().remove();

}

function zoomed() {
    "use strict";
    projection
        .translate(zoom.translate())
        .scale(zoom.scale());

    g.selectAll("path")
        .attr("d", path);


    let links = layer_links.selectAll(".link")
        .attr("x1", d => projection(d.from)[0])
        .attr("y1", d => projection(d.from)[1])
        .attr("x2", d => projection(d.to)[0])
        .attr("y2", d => projection(d.to)[1]);

    let locations = layer_locations.selectAll(".location")
        .attr("cx", d => projection(d.coordinates)[0])
        .attr("cy", d => projection(d.coordinates)[1]);

    let topLeft = projection.invert([0,0]);
    let bottomRight = projection.invert([width,height]);
    let minPopulation = 10000000 * scale0 / (2 * zoom.scale() ); // 10M

    let state = store.getState();
    let filteredCityNames = state.cityNames.filter(city => {
        return city.population > minPopulation &&
            city.coordinates[0]>topLeft[0] &&
            city.coordinates[1]<topLeft[1] &&
            city.coordinates[0]<bottomRight[0] &&
            city.coordinates[1]>bottomRight[1];
    });

    //console.log(scale0, zoom.scale(), filteredCityNames.length)

    let cities = layer_cities.selectAll(".city").data(filteredCityNames);

    cities.enter()
        .append("svg:circle")
        .attr("class", "city")
        .attr("stroke", "yellow")
        .attr("fill", "yellow")
        .attr("r", 4);
    cities
        .attr("cx", d => projection(d.coordinates)[0])
        .attr("cy", d => projection(d.coordinates)[1])
        .on("mousemove", d => {
            var mouse = d3.mouse(svg.node());
            tooltip
                .classed("hidden", false)
                .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
                .html(d.name);
        })
        .on("mouseout",  () => tooltip.classed("hidden", true) );

    cities.exit().remove();

}


export default {
    render
};