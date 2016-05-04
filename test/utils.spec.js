const expect = require('chai').expect;
const hat = require('../index');

const inputData = require('./fixtures/inputObject');
const hatIdMapping = require('./fixtures/hatIdMapping');
const expectedResult = require('./fixtures/expectedHatRecord');

describe('Data transformation utility functions', function() {
  it('convert single nested object to HAT data structure', function() {
    const result = hat.transform.transformObjToHat(inputData, hatIdMapping, 'givenString');
    expect(result).to.deep.equal(expectedResult);
  });
});
