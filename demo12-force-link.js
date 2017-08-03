var svg = d3.select('svg');
var width = 600;
var height = 600;

var nodeData = [{'x':100,'y':100,'r':15,'id':1},
				{'x':300,'y':100,'r':15,'id':2},
				{'x':50,'y':200,'r':15,'id':3},
				{'x':350,'y':200,'r':15,'id':4},
				{'x':100,'y':300,'r':15,'id':5},
				{'x':300,'y':300,'r':15,'id':6},
				{'x':200,'y':300,'r':15,'id':7}];
				
var nodeLinks = [{"source":0,"target":1,"distance":10},
					{"source":1,"target":2,"distance":20},
					{"source":2,"target":3,"distance":30},
					{"source":3,"target":4,"distance":40},
					{"source":4,"target":5,"distance":50},
					{"source":5,"target":6,"distance":60},
					{"source":6,"target":0,"distance":70}];

var dist = 40;
var simulation = d3.forceSimulation(nodeData)
.alphaDecay(0.01);

var linkForce = d3.forceLink()
.links(nodeLinks)
.distance(dist)
.strength(2);

simulation.force('linkForce', linkForce)
.force('charge', d3.forceManyBody())
.force('center', d3.forceCenter(width/2, height/2));

var text = svg.selectAll('text')
.data(nodeData)
.enter()
.append('text')
.attr('font-size', '12px')
.attr('font-family', 'sans-serif')
.attr('fill', 'black');

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

	text.text(function(d){
		return d.id;
	})
	.attr('x', function(d){
		return d.x;
	})
	.attr('y', function(d){
		return d.y;
	})
	.attr('dx', '-3.5')
	.attr('dy', '2.5');
}

simulation.on('tick', ticked);