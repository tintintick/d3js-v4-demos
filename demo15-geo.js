var svg = d3.select('svg');
var width = 960;
var height = 500;

var projection = d3.geoMercator()
.scale(width/2/Math.PI)
.translate([width/2, height/2]);

var path = d3.geoPath()
.projection(projection);

var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
d3.json(url, function(error, geojson) {
	svg.append('path')
	.attr('d', path(geojson))
});