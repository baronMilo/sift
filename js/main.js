var width = 500, height = 500;
var data;

var svg = d3.select("#svg").append("svg")
  .attr("width", width)
  .attr("height", height);

var container = svg.append("g");  
var dE = dataEngine();
var circ = circles().radius(3);
var sim = forceSim().width(width).height(height);
var vM = composer().container(container);

d3.csv("dat/cars.csv", function(error, ret) {
  if (error) throw error;

  //data
  data =ret;
  dE.data(data)
  console.log(dE.dimensions());
  selectedDimension(dE.dimensions()[0]);
});

var selectedDimension = Signal(undefined);
var dataContent = Signal(function() {
  if (selectedDimension() == undefined) return undefined; 
  return dE.groupBy(selectedDimension());
});
var refreshVis = Observer(function() {
  if (dataContent() == undefined) return undefined;

  //compose
  vM.data(dataContent()).compose([circ, sim])();
  console.log(dataContent()());
});
