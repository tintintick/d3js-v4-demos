var padding = {left:30,right:30,top:20,bottom:20};
var width = 400;
var height = 400;
var dataSet = [10, 20, 30, 40, 33, 24, 12, 5];

var yScale = d3.scaleLinear()
.domain([0,d3.max(dataSet)])
.range([height-padding.top-padding.bottom,0]);

var xScale = d3.scaleBand()
.domain(d3.range(dataSet.length))
.range([0,width-padding.left-padding.right]);

var yaxis = d3.axisLeft(yScale);
var xaxis = d3.axisBottom(xScale);

var barWidth = 30;
var svg = d3.select('svg');
var maxLength = yScale(d3.max(dataSet))+20;

svg.selectAll('rect')
.data(dataSet)
.enter()
.append('rect')
.attr("transform","translate("+padding.left+",0)")
.attr('width', barWidth)
.attr('height', function(d){
	return height-yScale(d)-padding.top-padding.bottom;
})
.attr('x', function(d,i){
	return i*(barWidth+7);
})
.attr('y', function(d){
	return yScale(d)+padding.top;
})
.attr('fill', 'steelblue');

svg.append('g')
.attr("class","axis")
.attr("transform","translate("+padding.left+","+(height-padding.bottom)+")")
.call(xaxis);

svg.append('g')
.attr("class","axis")
.attr("transform","translate("+padding.left+","+padding.top+")")
.call(yaxis);