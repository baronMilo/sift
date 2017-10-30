// centralized management of nodes
// applies marks through a cascade of renderings (i.e. reusable components)
// each rendering is an object and could be visual components or actions

function composer() {
  var container, data, compose = [];
  var nodes = [];
  
  function comp() {
    if (container && data) {
      var vmNode = container.selectAll(".vmNode").data(data);
      vmNode.enter().append("g")
        .attr("class", "vmNode");
      vmNode.exit().remove();

      nodes = container.selectAll(".vmNode")
        .each(function(d) {
          
        }).nodes();
    }
    
    compose.forEach(function(d) {
      container.selectAll(".vmNode").call(d);
    });

  }

  comp.container = function(value) {
    if (!arguments.length) return container;
    container = value;
    return comp;
  };
  comp.data = function(value) {
    if (!arguments.length) return data;
    data = value;
    return comp;
  };
  comp.compose = function(value) {
    if (!arguments.length) return compose;
    compose = value;
    return comp;
  };

  comp.nodes = function() {
    return nodes;
  }

  return comp;
}