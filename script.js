var getData = function() {
  return $.getJSON("https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json")
}
var createGraph = function(data) {
  var dragstarted = function(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x - marginLeft;
    d.fy = d.y - marginTop;
  }

  var dragged = function(d) {
    d.fx = d3.event.x - marginLeft;
    d.fy = d3.event.y - marginTop;
  }

  var dragended = function(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  var margin = {top: 30, right: 50, bottom: 30, left: 50},
      width = 1000 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;

  var marginTop = parseInt($('.graph').css('marginTop')),
  marginLeft = parseInt($('.graph').css('marginLeft')); // sets the margins so nodes connect with lines

  var svg = d3.select('body').select('svg');
  var div = d3.select('body').select('.graph');

  svg.attr('height', height.toString() + 'px').attr('width', width.toString() + 'px')
  div.style('height', height.toString() + 'px').style('width', width.toString() + 'px')


  var simulation = d3.forceSimulation()
      .nodes(data.nodes)
      .force("link", d3.forceLink(data.links))
      .force("charge", d3.forceManyBody().distanceMax(150).strength(-15))
      .force("center", d3.forceCenter(width / 2, height / 2))

  var link = svg.selectAll('.link')
      .data(data.links)
      .enter().append('line')
      .attr('class', 'link')
      .attr('stroke-width', '1px');

  var node = d3.select('body').select('.graph').select('.flags').selectAll('.node')
      .data(data.nodes)
      .enter().append('img')
      .attr('class', function(d){ return 'node flag flag-' + d.code })
      .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

    simulation.on('tick', function() {
      node.attr('height', '6px')
          .attr('width', '8px')
          .style("left", function(d) { return (d.x = Math.max(marginLeft, Math.min(width - 16, d.x) + marginLeft)).toString() + 'px' })
          .style("top", function(d) { return (d.y = Math.max(marginTop, Math.min(height - 12, d.y) + marginTop)).toString() + 'px'; })

      link.attr('x1', function(d) { return d.source.x + 4 - marginLeft; })
          .attr('y1', function(d) { return d.source.y + 3 - marginTop; })
          .attr('x2', function(d) { return d.target.x + 4 - marginLeft; })
          .attr('y2', function(d) { return d.target.y + 3 - marginTop; });
  })
}
$(function(){
  var promise = getData();
  promise.success(function(data){
    createGraph(data);
  })
});
