import {
    SET_SELECTION,
    SELECT_ALL,
    DESELECT_ALL,
    NO_EVENT
} from '../../../constants/ActionTypes';

import { keyFromObject } from '../../../util/keyGenerator';

export function selectAll(data) {
    const keys = data.currentRecords.map(keyFromObject);
    const selection = keys.reduce((obj, k) => {
        obj[k] = true;
        return obj;
    }, {});

    return { type: SELECT_ALL, selection };
}

export function deselectAll() {
    return { type: DESELECT_ALL };
}

export function setSelection(id, selectionModelDefaults, modes) {

    const allowDeselect = selectionModelDefaults.allowDeselect;
    const clearSelections = selectionModelDefaults.mode === modes.checkboxSingle
        || selectionModelDefaults.mode === modes.single;

    if (!selectionModelDefaults.enabled) {
        console.warn('Selection model has been disabled');
        return { type: NO_EVENT };
    }

    if (selectionModelDefaults.mode === modes.single) {
        return { type: SET_SELECTION, id, clearSelections, allowDeselect };
    }

    else if (selectionModelDefaults.mode === modes.multi) {
        return { type: SET_SELECTION, id, allowDeselect };
    }

    else if (selectionModelDefaults.mode === modes.checkboxSingle
        || selectionModelDefaults.mode === modes.checkboxMulti) {
        return { type: SET_SELECTION, id, clearSelections, allowDeselect };
    }
}