function forceSim() {
  var width, height; 

  function comp(node) {
    node.each(function(d) {
      d.r = this.getBoundingClientRect().width / 2;
    });

    var ticked = function()  {
      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    }

    var simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force("collide",d3.forceCollide(0).radius(function(d) { return d.r + 0.5; }).iterations(16) )
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("y", d3.forceY(0).strength(0.02))
      .force("x", d3.forceX(0).strength(0.02))
      .nodes(node.data())
      .on("tick", ticked);

  }

  comp.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return comp;
  };

  comp.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    return comp;
  };

  return comp;
}