var svg = d3.select('svg');
var width = 600;
var height = 600;

var nodeData = [{'x':100,'y':100,'r':15},
				{'x':300,'y':100,'r':15},
				{'x':50,'y':200,'r':15},
				{'x':350,'y':200,'r':15},
				{'x':100,'y':300,'r':15},
				{'x':300,'y':300,'r':15},
				{'x':200,'y':300,'r':15}];
				
var simulation = d3.forceSimulation(nodeData)
.alphaDecay(0.03);

var attractForce = d3.forceManyBody()
.strength(200)
.distanceMax(600)
.distanceMin(60);

var collideForce = d3.forceCollide()
.radius(18)
.strength(1)
.iterations(50);

simulation.force('attractForce', attractForce)
.force('collideForce', collideForce);

var nodes = svg.selectAll('circle')
.data(nodeData)
.enter()
.append('circle')
.attr('r', function(d){
	return d.r;
})
.attr('cx', function(d){
	return d.x;
})
.attr('cy', function(d){
	return d.y;
})
.attr('fill', 'steelblue').attr('opacity', .5)
.call(d3.drag()
.on('start', started)
.on('drag', dragged)
.on('end', ended));

function started(d) {
	simulation.restart();
	simulation.alpha(1);
	d.fx = d.x;
	d.fy = d.y;
}

function dragged(d) {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

function ended(d) {
	d.fx = null;
	d.fy = null;
	simulation.alphaTarget(.1);
}

function ticked(d) {
	nodes.attr('cx', function(d){
		return d.x;
	})
	.attr('cy', function(d){
		return d.y;
	});
}

simulation.on('tick', ticked);