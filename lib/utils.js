'use strict';

var internals = {};

internals.normalizeToSelectedTypes = (key, value) => {
  if (typeof value === 'number' && key !== 'id') {
    return value.toString();
  } else if (typeof value === 'boolean') {
    return value.toString();
  } else {
    return value;
  }
};

exports.normalizeJSONValueTypes = (data) => {
  return JSON.stringify(data, internals.normalizeToSelectedTypes);
};