/**
* utility classed used by all reducers to
* update their internal Immutable records
* @param {object}  state
* @param {string} stateKey
* @param {object} values
* @param {Immutable.Record} type
* @param {string} operation
**/

import { fromJS } from 'immutable';

export const getUpdatedDataRecord = (
    state, stateKey, values = {}, type, operation = 'setIn'
) => {
    if (operation === 'setIn') {
        return state[operation]([stateKey], new type(values));
    }

    else if (operation === 'mergeIn') {
        const p = state.get(stateKey)
            ? state.get(stateKey)
            : fromJS({});

        return state[operation]([stateKey], p.merge(values));
    }

    throw new Error('Update operation has not been implemented!');
};

export default getUpdatedDataRecord;
