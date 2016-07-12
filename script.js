var getData = function() {
  return $.getJSON(
    // python -m SimpleHTTPSever
    "/countries.json",
    function(json) {
      return json
    }
  )
}
var createGraph = function(data) {
  var dragstarted = function(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  var dragged = function(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  var dragended = function(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  var margin = {top: 30, right: 50, bottom: 30, left: 50},
      width = 1000 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;

  var svg = d3.select('body').select('svg');
  var div = d3.select('body').select('div');
  svg
      .attr('height', height)
      .attr('width', width)
      .style('background-color', 'white')
  div
      .attr('height', height)
      .attr('width', width)
      .style('background-color', 'white')

  var simulation = d3.forceSimulation()
      .nodes(data.nodes)
      .force("link", d3.forceLink(data.links))
      .force("charge", d3.forceManyBody().distanceMax(150).strength(-15))
      .force("center", d3.forceCenter(width / 2, height / 2))

  var link = svg.selectAll('.link')
      .data(data.links)
      .enter().append('line')
      .attr('class', 'link')
      .attr('stroke-width', 1);

  var node = div.selectAll('.node')
      .data(data.nodes)
      .enter().append('img')
      .attr('class', function(d){ return 'node flag flag-' + d.code })
      .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

    simulation.on('tick', function() {
        node.attr('height', 6)
            .attr('width', 8)
            .style("left", function(d) { return d.x = Math.max(8, Math.min(width - 12, d.x)); })
            .style("top", function(d) { return d.y = Math.max(6, Math.min(height - 10, d.y)); })

        link.attr('x1', function(d) { return d.source.x + 4; })
            .attr('y1', function(d) { return d.source.y + 3; })
            .attr('x2', function(d) { return d.target.x + 4; })
            .attr('y2', function(d) { return d.target.y + 3; });
  })
}
$(function(){
  var promise = getData();
  promise.success(function(data){
    createGraph(data);
  })
});
