'use strict';

const _ = require('lodash');

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

exports.mapDataSourceModelIds = (data) => {
  const hatIdMappingArray = internals.mapDataSourceModelIds(data, '');
  const hatIdMapping = _.zipObject(hatIdMappingArray);

  return hatIdMapping;
};

internals.mapDataSourceModelIds = (table, prefix) => {
  if (prefix !== '') prefix = prefix + '_';

  if (!table.fields && !table.subTables) {
    throw new Error('HAT data source model invalid');
  }

  const tableMapping = _.map(table.fields, (field) => {
    return [prefix + field.name, field.id];
  });

  if (table.subTables && table.subTables.length > 0) {
    const subTableMapping = _.map(table.subTables, (subTable) => {
      return internals.mapDataSourceModelIds(subTable, prefix+subTable.name);
    });

    const flattenedSubTableMapping = _.flatten(subTableMapping);

    return tableMapping.concat(flattenedSubTableMapping);
  }

  return tableMapping;
};

exports.transformObjToHat = (data, hatIdMapping, name) => {
  // Ajust for cases when data presented in "data" property of an onbject
  if (data.data) data = data.data;

  const recordName = name || 'default_' + new Date();

  if (_.isArray(data)) {
    const hatData = _.map(data, (node) => {
      const hatValues = internals.generateHatValues(node, hatIdMapping, '');

      return {
        record: { name: recordName },
        values: hatValues
      };
    });

    return hatData;

  } else if (_.isObject(data)) {
    const hatValues = internals.generateHatValues(data, hatIdMapping, '');

    return [{
      record: { name: recordName },
      values: hatValues
    }];
  } else {
    throw 'Provided data format is not valid';
  }
};

internals.generateHatValues = (node, hatIdMapping, prefix) => {
  if (prefix !== '') prefix = prefix + '_';

  const hatData = _.map(node, (value, key) => {

    if (typeof value === 'object') {
      return internals.generateHatValues(value, hatIdMapping, prefix+key);
    } else {
      return {
        value: value,
        field: {
          id: hatIdMapping[prefix+key],
          name: key
        }
      };
    }

  });

  const flattenedHatData = _.flattenDeep(hatData);

  return flattenedHatData;
};