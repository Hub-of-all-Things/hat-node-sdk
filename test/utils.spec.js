const expect = require('chai').expect;
const hat = require('../index');

const dataSourceModel = require('./fixtures/dataModel');
const inputObject = require('./fixtures/inputObject');
const inputArray = require('./fixtures/multipleInputObjects');
const hatIdMapping = require('./fixtures/hatIdMapping');
const expectedHatRecord = require('./fixtures/hatRecord');
const expectedMultipleHatRecords = require('./fixtures/multipleHatRecords');

describe('Data transformation utility functions', function() {
  it('extracts HAT field ID mapping from HAT data model', function() {
    const result = hat.transform.mapDataSourceModelIds(dataSourceModel);
    expect(result).to.deep.equal(hatIdMapping);
  });

  it('throws error for invalid HAT data model', function() {
    try {
      hat.transform.mapDataSourceModelIds({ id: 1, name: "events" });
    } catch(err) {
      expect(err).to.eql(new Error);
    }
  });

  it('convert single nested object to a HAT data structure', function() {
    const result = hat.transform.transformObjToHat(inputObject, hatIdMapping, 'givenString');
    expect(result).to.deep.equal(expectedHatRecord);
  });

  it('convert array of objects to a HAT data structure', function() {
    const result = hat.transform.transformObjToHat(inputArray, hatIdMapping, 'givenString');
    expect(result).to.deep.equal(expectedMultipleHatRecords);
  });
});
