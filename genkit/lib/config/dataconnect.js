"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataconnectClient = void 0;
const app_1 = require("firebase/app");
const data_connect_1 = require("firebase/data-connect");
const dc_1 = require("@restaurants/dc");
const getDataconnectClient = (host = 'localhost') => {
    // Note: When connecting to a prod instance, please replace the empty config with your firebase config provided in the console.	
    const firebaseApp = (0, app_1.initializeApp)({ projectId: 'lon-next' });
    const dataConnect = (0, data_connect_1.getDataConnect)(firebaseApp, dc_1.connectorConfig);
    if (dataConnect.isEmulator) {
        return dataConnect;
    }
    // If this is running on the client then tell Data Connect to use
    // the reverse proxy to send requests.
    // Note: This is only needed when running in a Cloud Editor
    // It is always 'localhost' on the server
    (0, data_connect_1.connectDataConnectEmulator)(dataConnect, 'localhost', 9399, false);
    return dataConnect;
};
exports.getDataconnectClient = getDataconnectClient;
//# sourceMappingURL=dataconnect.js.map