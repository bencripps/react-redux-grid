import { fromJS } from 'immutable';
import { generateLastUpdate } from './../../../util/lastUpdate';

export const selectAll = (state, { selection, stateKey }) =>
    state.setIn([stateKey], fromJS({
        ...selection,
        lastUpdate: generateLastUpdate()
    }));

export const deselectAll = (state, { stateKey }) =>
    state.setIn([stateKey], fromJS({
        lastUpdate: generateLastUpdate()
    }));

export const removeSelections = (state, { stateKey }) =>
    state.setIn([stateKey], fromJS({
        lastUpdate: generateLastUpdate()
    }));

export const selectRow = (state, { rowId, stateKey }) =>
    state.mergeIn([stateKey], fromJS({
        [rowId]: true,
        lastUpdate: generateLastUpdate()
    }));

export const deselectRow = (state, { rowId, stateKey }) =>
    state.mergeIn([stateKey], fromJS({
        [rowId]: false,
        lastUpdate: generateLastUpdate()
    }));

export const setSelection = (state, {
    allowDeselect, clearSelections, id, index, stateKey
}) => {
    const currentValue = state.getIn([stateKey, id]);
    const currentIndexes = state.getIn(
        [stateKey, 'indexes']
    );
    const isSelectAction = allowDeselect ? !currentValue : true;
    const indexes = setIndexes(
        index,
        currentIndexes && currentIndexes.toJS
            ? currentIndexes.toJS()
            : currentIndexes,
        !isSelectAction
    );

    if (clearSelections || !state.get(stateKey)) {
        return state.setIn([stateKey], fromJS({
            [id]: isSelectAction,
            indexes: isSelectAction ? [index] : [],
            lastUpdate: generateLastUpdate()
        }));
    }

    // multiselect
    return state.mergeIn([stateKey], fromJS({
        [id]: isSelectAction,
        indexes,
        lastUpdate: generateLastUpdate()
    }));
};

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

