var createDataSet = function() {
  var data = [];
  for (var i = 0; i < 75; i++) {
    var rand = Math.floor((Math.random() * 100) + 10)
    data.push(rand);
  }
  return data
}
var createGraph = function(data) {
  var y = d3.scaleLinear()
      .domain([0, 10])
      .range([0, 100])
  x = d3.scaleLinear()
      .domain([0, 10])
      .range([0, 100]);
}
$(function(){
  var data = createDataSet();
  createGraph(data);
});
