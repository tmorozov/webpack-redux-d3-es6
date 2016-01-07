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
    .attr("height", height);

let tooltip = d3.select("body").append("div")
    .attr("class", "tooltip");


let land = svg.append("path")
    .attr("class", "land");

let boundary = svg.append("path")
    .attr("class", "boundary");

let graticule = svg.append("path")
    .attr("class", "graticule");

let layer0_countries = svg.append('g');
let layer1_likns = svg.append('g');
let layer2_locations = svg.append('g');




function render(state) {
    "use strict";

    //projection.scale(projection.scale()*2);

    graticule.datum(graticuleData).attr("d", path);

    if(state.geoData.isValid) {
        let world = state.geoData.world;

        //land.datum(topojson.feature(world, world.objects.land))
        //    .attr("d", path);

        //boundary.datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        //    .attr("d", path);


        let countries = topojson.feature(world, world.objects.countries).features;
        let country = layer0_countries.selectAll(".country").data(countries);

        country
            .enter()
            .insert("path")
            .attr("class", "country")
            .attr("title", function(d) { return d.name; })
            .attr("d", path);

        //Show/hide tooltip
        country
            .on("mousemove", d => {
                var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );

                tooltip
                    .classed("hidden", false)
                    .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
                    .html(state.countryNames[d.id].name);
            })
            .on("mouseout",  () => tooltip.classed("hidden", true) );

    }


    let links = layer1_likns.selectAll(".link").data(state.links);
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


    let locations = layer2_locations.selectAll(".location").data(state.locations);
    locations.enter()
        .append("svg:circle")
        .attr("class", "location")
        .attr("stroke", "blue")
        .attr("fill", "#fff")
        .attr("r", 2);
    locations
        .attr("cx", d => projection(d.coordinates)[0])
        .attr("cy", d => projection(d.coordinates)[1]);
    locations.exit().remove();

}

export default {
    render
};