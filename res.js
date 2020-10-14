"use strict";

exports.ok = function (values, res) {
  var data = {
    status: 200,
    values: values,
  };

  console.log(values);
  res.json(data);
  res.end();
};
