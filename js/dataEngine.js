//builds a heirarchical structure based on the supplied data
// data can be returned at any level of the heirarchy
//data can be aggregate at any level of the heirarchy

function dataEngine() {
  var data, dimensions, metrics;

  function comp() {
    var nested = [];

    if (data) {
      d3.nest()
        .key(function(d) { return d[groupBy]; })
        .entries(data)
        .forEach(function(d) {
          var ret = {};
          ret.key = d.key;
          ret.count = d.values.length;
          ret.values = d.values;
          metrics.forEach(function(m) {
            ret[m] = {};
            ret[m].sum = d3.sum(d.values, function(v) { return +v[m]; });
            ret[m].avg = d3.mean(d.values, function(v) { return +v[m]; });
            ret[m].ext = d3.extent(d.values, function(v) { return +v[m]; });
          });
          nested.push(ret);
        });
    }

    return nested;
  }

  //getter/setter
  comp.data = function(value) {
    if (!arguments.length) return data;
    data = value;
    
    //classify fields based on values
    //  non-numeric = dimension
    //  float = metric 
    //  integer = both dimension and metric     
    var prop = Object.keys(data),
      fieldType;
    dimensions = [];
    metrics = [];
    Object.keys(data[0]).forEach(function(prop) {
      fieldType = getFieldType(data.map(function(d) { return d[prop]; }));
      if (fieldType.indexOf("dimension") != -1) dimensions.push(prop);
      if (fieldType.indexOf("metric") != -1) metrics.push(prop);
    });
    return comp;
  };
  comp.groupBy = function(value) {
    if (!arguments.length) return groupBy;
    groupBy = value;
    return comp;
  };

  //getter only
  comp.dimensions = function() {
    return dimensions;
  };
  comp.metrics = function() {
    return metrics;
  };

  return comp;
}