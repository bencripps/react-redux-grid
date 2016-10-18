import { fromJS } from 'immutable';
import { generateLastUpdate } from './../../../util/lastUpdate';

export const showMenu = (state, { stateKey, id }) =>
    state.setIn([stateKey], fromJS({
        [id]: true,
        lastUpdate: generateLastUpdate()
    }));

export const hideMenu = (state, { stateKey, id }) =>
    state.setIn([stateKey], fromJS({
        [id]: false,
        lastUpdate: generateLastUpdate()
    }));

