var svg = d3.select('svg');
var width = 400;
var height = 400;

var nodeData = [{'x':100,'y':100,'id':'Node'}];
var nodeSim = d3.forceSimulation(nodeData);
var xAxisForce = d3.forceX().strength(5).x(width/2);
var yAxisForce = d3.forceY().strength(5).y(height/2);
nodeSim.alphaDecay(0.01)
.force('xAxis', xAxisForce)
.force('yAxis', yAxisForce);

var node = svg.selectAll('circle')
.data(nodeData)
.enter()
.append('circle')
.attr('r',30).attr('cx', width/2).attr('cy', height/2)
.attr('fill', 'steelblue').attr('opacity', .5)
.call(d3.drag()
.on('start', dragStart)
.on('drag', dragged)
.on('end', dragEnd));

nodeSim.on('tick', ticked);

function dragStart(d) {
	nodeSim.restart();
	nodeSim.alpha(1);
	d.fx = d.x;
	d.fy = d.y;
}

function dragged(d) {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

function dragEnd(d) {
	d.fx = null;
	d.fy = null;
	nodeSim.alphaTarget(.1);
}

function ticked() {
	node.attr('cx', function(d){
		return d.x;
	})
	.attr('cy', function(d){
		return d.y;
	});
}