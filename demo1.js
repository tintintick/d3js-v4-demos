var dataset = [ 250 , 210 , 170 , 130 , 90 ];
d3.select('svg')
.selectAll('rect')
.data(dataset)
.enter()
.append('rect')
.attr('x',20)
.attr('width',function(d,i){
return d;
})
.attr('y',function(d,i){
return i*25;
})
.attr('height',20)
.attr('fill', 'steelblue');