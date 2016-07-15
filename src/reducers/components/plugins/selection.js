import { fromJS } from 'immutable';

import {
    SET_SELECTION,
    SELECT_ALL,
    DESELECT_ALL
} from '../../../constants/ActionTypes';

import { generateLastUpdate } from './../../../util/lastUpdate';

const initialState = fromJS({ lastUpdate: generateLastUpdate() });

export default function selection(state = initialState, action) {

    switch (action.type) {

    case SELECT_ALL:
        return state.setIn([action.stateKey], fromJS({
            ...action.selection,
            lastUpdate: generateLastUpdate()
        }));

    case DESELECT_ALL:
        return state.setIn([action.stateKey], fromJS({
            lastUpdate: generateLastUpdate()
        }));

    case SET_SELECTION:
        const currentValue = state.getIn([action.stateKey, action.id]);
        const currentIndexes = state.getIn(
            [action.stateKey, 'indexes']
        );
        const isSelectAction = action.allowDeselect ? !currentValue : true;
        const indexes = setIndexes(
            action.index,
            currentIndexes && currentIndexes.toJS
                ? currentIndexes.toJS()
                : currentIndexes,
            !isSelectAction
        );

        if (action.clearSelections || !state.get(action.stateKey)) {
            return state.setIn([action.stateKey], fromJS({
                [action.id]: isSelectAction,
                indexes: isSelectAction ? [action.index] : [],
                lastUpdate: generateLastUpdate()
            }));
        }

        // multiselect
        return state.mergeIn([action.stateKey], fromJS({
            [action.id]: isSelectAction,
            indexes,
            lastUpdate: generateLastUpdate()
        }));

    default:
        return state;
    }
}

export const setIndexes = (ids, previous = [], isRemove) => {

    if (!isRemove) {

        if (Array.isArray(ids)) {

            ids.forEach(id => {
                if (previous.indexOf(id) === -1) {
                    previous.push(id);
                }
            });

        }

        else {

            if (previous.indexOf(ids) !== -1) {
                return previous;
            }

            previous.push(ids);
            return previous;

        }
    }

    else if (isRemove) {

        let idx;

        if (Array.isArray(ids)) {

            ids.forEach(id => {
                idx = previous.indexOf(id);
                if (idx !== -1) {
                    previous.splice(idx, 1);
                }
            });

        }

        else {

            idx = previous.indexOf(ids);

            if (idx !== -1) {
                previous.splice(idx, 1);
                return previous;
            }

            return previous;

        }

    }

    return previous;
};
