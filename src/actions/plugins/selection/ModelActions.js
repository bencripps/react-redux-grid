import {
    SET_SELECTION,
    SELECT_ALL,
    DESELECT_ALL,
    NO_EVENT,
    SELECT_ROW,
    DESELECT_ROW
} from '../../../constants/ActionTypes';

export const selectRow = ({ stateKey, rowId }) => ({
    type: SELECT_ROW,
    stateKey,
    rowId
});

export const deselectRow = ({ stateKey, rowId }) => ({
    type: DESELECT_ROW,
    stateKey,
    rowId
});

export const selectAll = ({ data, stateKey }) => {

    if (!data) {
        return {};
    }

    const keys = data.currentRecords.map(row => row._key || row.get('_key'));
    const indexes = [];

    const selection = keys.reduce((obj, k, i) => {
        obj[k] = true;
        indexes.push(i);
        return obj;
    }, {});

    return { type: SELECT_ALL, selection, stateKey, indexes };
};

export const deselectAll = ({ stateKey }) => ({
    type: DESELECT_ALL, stateKey
});

export const setSelection = ({
    id, defaults = {}, modes = {}, stateKey, index
}) => {

    const allowDeselect = defaults.allowDeselect;
    const clearSelections = defaults.mode === modes.checkboxSingle
        || defaults.mode === modes.single;

    if (!defaults.enabled) {
        /* eslint-disable no-console */
        console.warn('Selection model has been disabled');
        /* eslint-enable no-console */
        return { type: NO_EVENT };
    }

    if (defaults.mode === modes.single) {
        return {
            type: SET_SELECTION,
            id,
            clearSelections,
            allowDeselect,
            index,
            stateKey
        };
    }

    else if (defaults.mode === modes.multi) {
        return { type: SET_SELECTION, id, allowDeselect, index, stateKey };
    }

    else if (defaults.mode === modes.checkboxSingle
        || defaults.mode === modes.checkboxMulti) {
        return {
            type: SET_SELECTION,
            id,
            clearSelections,
            allowDeselect,
            index,
            stateKey
        };
    }
};
