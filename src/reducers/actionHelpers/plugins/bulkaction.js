import { fromJS } from 'immutable';
import { generateLastUpdate } from './../../../util/lastUpdate';

export const removeToolbar = (state, { stateKey, value }) =>
    state.setIn([stateKey], fromJS({
        isRemoved: value,
        lastUpdate: generateLastUpdate()
    }));
