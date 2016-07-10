var createDataSet = function() {
  var data = [];
  for (var i = 0; i < 75; i++) {
    var rand = Math.floor((Math.random() * 100) + 10)
    data.push(rand);
  }
  return data
}

$(function(){
  var data = getData();
  console.log(data)
});
