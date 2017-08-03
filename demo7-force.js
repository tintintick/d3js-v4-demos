var nodes = [ { name: "桂林" }, { name: "广州" },
              { name: "厦门" }, { name: "杭州" },
              { name: "上海" }, { name: "青岛" },
              { name: "天津" } ];

var links = [ { source : 0 , target: 1 } , { source : 0 , target: 2 } ,
               { source : 0 , target: 3 } , { source : 1 , target: 4 } ,
               { source : 1 , target: 5 } , { source : 1 , target: 6 } ];

var svg = d3.select('svg');
var width = 400;
var height = 400;

var simulation = d3.forceSimulation()
.force('charge', -400)
.force('center', d3.forceCenter(width, height));

simulation.nodes(nodes);
simulation.force('link')
.links(links);

simulation.restart();
console.log(nodes);
console.log(links);