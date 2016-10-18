import { fromJS } from 'immutable';
import { generateLastUpdate } from './../../../util/lastUpdate';

export const errorOccurred = (state, { error, stateKey }) =>
    state.setIn([stateKey], fromJS({
        error: error,
        errorOccurred: true,
        lastUpdate: generateLastUpdate()
    }));

export const dismissError = (state, { stateKey }) =>
    state.setIn([stateKey], fromJS({
        error: '',
        errorOccurred: false,
        lastUpdate: generateLastUpdate()
    }));
