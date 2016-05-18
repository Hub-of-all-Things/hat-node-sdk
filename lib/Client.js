'use strict';

const Req = require('./Req');
const utils = require('./utils');

let DEFAULT_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

module.exports = class Client {

  constructor(url, accessToken) {
    this.url = url;
    this.accessToken = accessToken;
    this.headers = DEFAULT_HEADERS;

    this.headers['Host'] = url.replace(/.*?:\/\//g, '');
  }

  getDataSourceId(name, source, callback) {
    const url = this.url + '/table';

    const queryString = {
      name: name,
      source: source,
      access_token: this.accessToken
    };

    return new Req('GET', url, this.headers, queryString, callback);
  }

  getDataSourceModel(dataSourceId, callback) {
    const url = this.url + '/table/' + dataSourceId;

    const queryString = { access_token: this.accessToken };

    return new Req('GET', url, this.headers, queryString, callback);
  }

  createDataSourceModel(model, callback) {
    const url = this.url + '/table';

    const queryString = { access_token: this.accessToken };

    return new Req('POST', url, this.headers, queryString, model, callback);
  }

  createMultipleRecords(recordData, callback) {
    const url = this.url + '/record/values';

    const queryString = { access_token: this.accessToken };

    const normalizedRecordData = utils.normalizeJSONValueTypes(recordData);

    return new Req('POST', url, this.headers, queryString, normalizedRecordData, callback);
  }
}