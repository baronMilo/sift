function isFloat(n) {
    return n === +n && n !== (n|0);
}
function isInteger(n) {
    return n === +n && n === (n|0);
}
function getFieldType(d) {
  var fieldSum, fieldTypes = [];

  try {
    fieldSum = math.sum(d);
  }
  catch(e) {
    fieldSum = undefined;
  }

  if (fieldSum) {
    if (isFloat(fieldSum)) {
      fieldTypes.push("metric");
    }
    if (isInteger(fieldSum)) {
      fieldTypes.push("metric");
      fieldTypes.push("dimension");
  }
  }
  else {
    fieldTypes.push("dimension");
  }
  return fieldTypes
}