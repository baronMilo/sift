function circles() {
  var node, radius;

  function comp(selection) {
    
    node = selection.append("circle")
      .attr("class", "node")
    
    node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", radius)
      .style("fill", "steelblue")

  }

  comp.radius = function(value) {
    if (!arguments.length) return radius;
    radius = value;
    return comp;
  };

  return comp;
}