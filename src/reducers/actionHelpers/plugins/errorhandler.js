import { ErrorHandler } from './../../../records';
import { generateLastUpdate } from './../../../util/lastUpdate';

export const errorOccurred = (state, { error, stateKey }) =>
    state.setIn([stateKey], new ErrorHandler({
        error: error,
        errorOccurred: true,
        lastUpdate: generateLastUpdate()
    }));

export const dismissError = (state, { stateKey }) =>
    state.setIn([stateKey], new ErrorHandler({
        error: '',
        errorOccurred: false,
        lastUpdate: generateLastUpdate()
    }));
