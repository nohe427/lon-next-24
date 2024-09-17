const { getDataConnect, queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'lon-next',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

function createStoreItemRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateStoreItem', inputVars);
}
exports.createStoreItemRef = createStoreItemRef;
exports.createStoreItem = function createStoreItem(dcOrVars, vars) {
  return executeMutation(createStoreItemRef(dcOrVars, vars));
};

function listStoreItemsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'ListStoreItems', inputVars);
}
exports.listStoreItemsRef = listStoreItemsRef;
exports.listStoreItems = function listStoreItems(dcOrVars, vars) {
  return executeQuery(listStoreItemsRef(dcOrVars, vars));
};

function listAllStoreItemsLimitRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'ListAllStoreItemsLimit', inputVars);
}
exports.listAllStoreItemsLimitRef = listAllStoreItemsLimitRef;
exports.listAllStoreItemsLimit = function listAllStoreItemsLimit(dcOrVars, vars) {
  return executeQuery(listAllStoreItemsLimitRef(dcOrVars, vars));
};

