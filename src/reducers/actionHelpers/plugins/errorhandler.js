import { ErrorHandler } from './../../../records';
import { generateLastUpdate } from './../../../util/lastUpdate';
import getUpdatedRecord from './../../../util/getUpdatedRecord';

export const errorOccurred = (state, { error, stateKey }) =>
    getUpdatedRecord(state, stateKey, {
        error: error,
        errorOccurred: true,
        lastUpdate: generateLastUpdate()
    }, ErrorHandler);

export const dismissError = (state, { stateKey }) =>
    getUpdatedRecord(state, stateKey, {
        error: '',
        errorOccurred: false,
        lastUpdate: generateLastUpdate()
    }, ErrorHandler);
