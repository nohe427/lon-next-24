const { getDataConnect, queryRef, executeQuery, mutationRef, executeMutation } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'local',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

function changeAisleRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars, true);
  return mutationRef(dcInstance, 'ChangeAisle', inputVars);
}
exports.changeAisleRef = changeAisleRef;
exports.changeAisle = function changeAisle(dcOrVars, vars) {
  return executeMutation(changeAisleRef(dcOrVars, vars));
};

function listStoreItemsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(dcOrVars, vars, true);
  return queryRef(dcInstance, 'ListStoreItems', inputVars);
}
exports.listStoreItemsRef = listStoreItemsRef;
exports.listStoreItems = function listStoreItems(dcOrVars, vars) {
  return executeQuery(listStoreItemsRef(dcOrVars, vars));
};

function validateArgs(dcOrVars, vars, validateVars) {
  let dcInstance;
  let realVars;
  // TODO; Check what happens if this is undefined.
  if(dcOrVars && 'dataConnectOptions' in dcOrVars) {
      dcInstance = dcOrVars;
      realVars = vars;
  } else {
      dcInstance = getDataConnect(connectorConfig);
      realVars = dcOrVars;
  }
  if(!dcInstance || (!realVars && validateVars)) {
      throw new Error('You didn\t pass in the vars!');
  }
  return { dc: dcInstance, vars: realVars };
}