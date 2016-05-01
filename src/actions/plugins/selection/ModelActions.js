import {
    SET_SELECTION,
    SELECT_ALL,
    DESELECT_ALL,
    NO_EVENT
} from '../../../constants/ActionTypes';

import { keyGenerator } from '../../../util/keyGenerator';

export function selectAll({ data, stateKey }) {
    const keys = data.currentRecords.map((row, i) => keyGenerator('row', i));

    const selection = keys.reduce((obj, k) => {
        obj[k] = true;
        return obj;
    }, {});
    return { type: SELECT_ALL, selection, stateKey };
}

export function deselectAll({ stateKey }) {
    return { type: DESELECT_ALL, stateKey };
}

export function setSelection({
    id, defaults, modes, stateKey
}) {

    const allowDeselect = defaults.allowDeselect;
    const clearSelections = defaults.mode === modes.checkboxSingle
        || defaults.mode === modes.single;

    if (!defaults.enabled) {
        console.warn('Selection model has been disabled');
        return { type: NO_EVENT };
    }

    if (defaults.mode === modes.single) {
        return { type: SET_SELECTION, id, clearSelections, allowDeselect, stateKey };
    }

    else if (defaults.mode === modes.multi) {
        return { type: SET_SELECTION, id, allowDeselect, stateKey };
    }

    else if (defaults.mode === modes.checkboxSingle
        || defaults.mode === modes.checkboxMulti) {
        return { type: SET_SELECTION, id, clearSelections, allowDeselect, stateKey };
    }
}