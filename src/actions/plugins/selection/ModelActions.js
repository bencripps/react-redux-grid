import {
    SET_SELECTION
} from '../../../constants/ActionTypes';


export function setSelection(id, selectionModelDefaults, modes) {

	const allowDeselect = selectionModelDefaults.allowDeselect;
	const clearSelections = selectionModelDefaults.mode === modes.checkboxSingle || selectionModelDefaults.mode === modes.single;

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