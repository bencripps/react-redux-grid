import {
    SET_SELECTION,
    NO_EVENT
} from '../../../constants/ActionTypes';


export function setSelection(id, selectionModelDefaults, modes) {

	const allowDeselect = selectionModelDefaults.allowDeselect;
	const clearSelections = selectionModelDefaults.mode === modes.checkboxSingle || selectionModelDefaults.mode === modes.single;

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

	else if (selectionModelDefaults.mode === modes.checkboxSingle || selectionModelDefaults.mode === modes.checkboxMulti) {

		return { type: SET_SELECTION, id, clearSelections, allowDeselect };
	}
}