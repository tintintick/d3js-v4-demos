var dataset = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];
var s=d3.scaleLinear()
.domain([0,d3.max(dataset)])
.range([0,250]);
d3.select('svg')
.selectAll('rect')
.data(dataset)
.enter()
.append('rect')
.attr('x',20)
.attr('y',function(d,i){
	return i*25;
})
.attr('width',function(d,i){
	return s(d);
})
.attr('height',20)
.attr('fill','steelblue')