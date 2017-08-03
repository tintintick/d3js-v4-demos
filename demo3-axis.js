var dataset = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];
var linear=d3.scaleLinear()
.domain([0,d3.max(dataset)])
.range([0,250]);
var axis=d3.axisBottom(linear);
axis.ticks(7);
var svg = d3.select('svg');
svg.selectAll('rect')
.data(dataset)
.enter()
.append('rect')
.attr('x',20)
.attr('y',function(d,i){
	return i*25;
})
.attr('width',function(d,i){
	return linear(d);
})
.attr('height',20)
.attr('fill','steelblue');

svg.append('g')
.call(axis);