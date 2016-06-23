'use strict';

const Req = require('./Req');
const utils = require('./utils');

let DEFAULT_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

module.exports = class Client {

  constructor(url, accessToken) {
    this.url = url + '/data';
    this.headers = DEFAULT_HEADERS;

    // Removes protocol prefix from URL
    this.headers['Host'] = url.replace(/.*?:\/\//g, '');
    this.headers['X-Auth-Token'] = accessToken;
  }

  getDataSourceId(name, source, callback) {
    const url = this.url + '/table';

    const queryString = {
      name: name,
      source: source
    };

    return new Req('GET', url, this.headers, queryString, callback);
  }

  getDataSourceModel(dataSourceId, callback) {
    const url = this.url + '/table/' + dataSourceId;

    return new Req('GET', url, this.headers, {}, callback);
  }

  createDataSourceModel(model, callback) {
    const url = this.url + '/table';

    return new Req('POST', url, this.headers, {}, model, callback);
  }

  createMultipleRecords(recordData, callback) {
    const url = this.url + '/record/values';

    const normalizedRecordData = utils.normalizeJSONValueTypes(recordData);

    return new Req('POST', url, this.headers, {}, normalizedRecordData, callback);
  }
}