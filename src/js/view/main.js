import store from "../store/store";
import {zoom} from "../actions/index";

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

let graticuleData = d3.geo.graticule();


let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    //.call(d3.behavior.zoom().on("zoom", onZoom))
    .on("click", onClick);

function onClick() {
    "use strict";
    let mouse = d3.mouse(svg.node());
    let coordinates = projection.invert(mouse);

    let curState = store.getState();
    store.dispatch(zoom(2 * curState.zoomPan.scale, coordinates));
}

//function onZoom() {
//    "use strict";
//    let curState = store.getState();
//
//    let pan = d3.event.translate;
//    let coordinates = projection.invert([-pan[0] + width / 2 , -pan[1] + height / 2]);
//
//    if(d3.event.scale < 1) {
//        return;
//    }
//
//    store.dispatch(zoom(150 * d3.event.scale, curState.zoomPan.coordinates));
//    //svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
//}

let tooltip = d3.select("body").append("div")
    .attr("class", "tooltip");


let land = svg.append("path")
    .attr("class", "land");

let boundary = svg.append("path")
    .attr("class", "boundary");

let graticule = svg.append("path")
    .attr("class", "graticule");

let layer_countries = svg.append('g');
let layer_cities = svg.append('g');
let layer_links = svg.append('g');
let layer_locations = svg.append('g');


function render(state) {
    "use strict";

    projection.scale(state.zoomPan.scale);
    projection.center(state.zoomPan.coordinates);

    graticule.datum(graticuleData).attr("d", path);

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

        //Show/hide tooltip
        country
            .on("mousemove", d => {
                var mouse = d3.mouse(svg.node());

                tooltip
                    .classed("hidden", false)
                    .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
                    .html(state.countryNames[d.id]? state.countryNames[d.id].name : "");
            })
            .on("mouseout",  () => tooltip.classed("hidden", true) );

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
    let minPopulation = 5000000 * 150 / state.zoomPan.scale; // 10M

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

export default {
    render
};