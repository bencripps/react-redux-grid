import { Selection } from './../../../records';
import { generateLastUpdate } from './../../../util/lastUpdate';
import getUpdatedRecord from './../../../util/getUpdatedRecord';

export const selectAll = (state, { selection, stateKey, indexes }) =>
    getUpdatedRecord(state, stateKey, {
        ...selection,
        indexes,
        lastUpdate: generateLastUpdate()
    }, Selection);

export const deselectAll = (state, { stateKey }) =>
    getUpdatedRecord(state, stateKey, {
        lastUpdate: generateLastUpdate(),
        indexes: []
    }, Selection);

export const removeSelections = (state, { stateKey }) =>
    getUpdatedRecord(state, stateKey, {
        lastUpdate: generateLastUpdate()
    }, Selection);

export const selectRow = (state, { rowId, stateKey }) =>
    getUpdatedRecord(state, stateKey, {
        [rowId]: true,
        lastUpdate: generateLastUpdate()
    }, Selection, 'mergeIn');

export const deselectRow = (state, { rowId, stateKey }) =>
    getUpdatedRecord(state, stateKey, {
        [rowId]: false,
        lastUpdate: generateLastUpdate()
    }, Selection, 'mergeIn');

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
        return getUpdatedRecord(state, stateKey, {
            [id]: isSelectAction,
            indexes: isSelectAction ? [index] : [],
            lastUpdate: generateLastUpdate()
        }, Selection);
    }

    // multiselect
    return getUpdatedRecord(state, stateKey, {
        [id]: isSelectAction,
        indexes,
        lastUpdate: generateLastUpdate()
    }, Selection, 'mergeIn');
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

