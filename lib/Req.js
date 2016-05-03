'use strict';

const request = require('request');
const qs = require('qs');
const url = require('url');

const noop = () => {};

module.exports = class Req {
  constructor(method, url, params, postData, callback) {
    if (typeof callback === 'undefined') {
      callback = postData;
      postData = {};
    }

    this.callback = callback || noop;
    this.postData = postData || null;

    this.options = {};
    this.options.encoding = this.options.encoding || 'utf-8';

    this.options.method = method;
    this.options.uri = url;
    this.options.headers = params.headers;
    this.options.qs = params.queryString;
    this.options.followRedirect = false;

    this.request = this[method.toLowerCase()]();

    return this;
  }

  get() {
    return request.get(this.options, (err, res, body) => {
      if (err) return this.callback(err);
      return this.end(body);
    });
  }

  post() {
    var postData = JSON.stringify(this.postData);
    this.options.body = postData;

    return request.post(this.options, (err, res, body) => {
      if (err) return this.callback(err);
      return this.end(body);
    });
  }

  end(body) {
    var err = null;
    var deserializedJSON = null;

    if (body) {
      try {
        // Handle actual JSON being returned
        if (~body.indexOf('{') && ~body.indexOf('}')) {
          deserializedJSON = JSON.parse(body);
        } else {
          // Handle cases when only query string is being returned
          // Dropbox error responses are inconsistent
          // Error strings will be converted to objects { error_summary: errorString }
          if (!~body.indexOf('=')) body = 'error_summary=' + body;
          if (body.charAt(0) !== '?') body = '?' + body;

          deserializedJSON = url.parse(body, true).query;
        }
      } catch (e) {
        err = e;
      }
    }

    if (!err && deserializedJSON.error_summary) err = deserializedJSON;

    this.callback(err, deserializedJSON);
  }
}