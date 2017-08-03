var svg = d3.select('svg')
	.attr('transform', 'translate(60, 0)');
var width = 600;
var height = 600;

var treemap = d3.tree()
	.size([width, height])
	.separation(function(a,b){
		return (a.parent==b.parent?1:2);
	});

// use python simplehttpserver
d3.json("demo.json", (error, treeData)=> {
	var nodes = d3.hierarchy(treeData);
	nodes = treemap(nodes);

	var g = svg.append('g')
	.attr('transform', 'translate(60, 0)');
	var link = g.selectAll('.link')
	.data(nodes.descendants().slice(1))
	.enter().append('path')
	.attr('class', 'link')
	.attr('d', function(d) {	
	//this function will decide tree is vertical or horizonal
		return "M" + d.y + "," + d.x
          + "C" + (d.y + d.parent.y) / 2 + "," + d.x
          + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
          + " " + d.parent.y + "," + d.parent.x;
	});

	var node = g.selectAll('.node')
	.data(nodes.descendants())
	.enter()
	.append('g')
	.attr('class', function(d) {
		return 'node'+(d.children?' node--internal':' node--leaf');
	})
	.attr('transform', function(d) {
		return 'translate('+d.y+','+d.x+')';
	});

	node.append('circle')
	.attr('r', 10);

	node.append('text')
	.attr('dy', '.35em')
	.attr('x', function(d) {
		return d.children? -12:12;
	})
	.style('text-anchor', function(d) {
		return d.children?'end':'start';
	})
	.text(function(d) {
		return d.data.name;
	});
});