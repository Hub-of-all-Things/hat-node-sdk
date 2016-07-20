# NodeJS library for HAT

Hat-node-sdk is a nodejs module that provides an easy access to the HAT API from node application.

Version: 0.1.3

License: AGPL

## Setting up

```javascript

var hatApi = require('hat-node-sdk');

```

Initialise the client:

```javascript

var client = new hat.Client('http://hat.hubofallthings.net', accessToken);

```

## Using the client

Currently available methods:

- getAllDataSources(callback)
- getDataSourceId(name, source, callback)
- getDataSourceModel(dataSourceId, callback)
- createDataSourceModel(model, callback)
- createMultipleRecords(recordData, callback)
- getOrCreateTable(name, source, model, callback)

## Utility methods

Data tranformation utility methods are also available:

- normalizeJSONValueTypes(data)
- mapDataSourceModelIds(rawDataModel)
- transformObjToHat(data, hatIdMapping, name)

These methods can be utilised via tranform alias.

```javascript

hat.transform[method_name]

```

### Contributing

If you would like to contribute to the project, please start with looking at our [guidelines](CONTRIBUTING.md).