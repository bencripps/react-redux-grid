import {
    SET_SELECTION
} from '../../../constants/ActionTypes';


export function setSelection(id, selectionModelDefaults, modes) {

	if (selectionModelDefaults.mode === modes.single) {
    	return { type: SET_SELECTION, id, clearSelections: true };
	}

	else if (selectionModelDefaults.mode === modes.multi) {
		return { type: SET_SELECTION, id }; 
	}

	else if (selectionModelDefaults.mode === modes.checkboxSingle || selectionModelDefaults.mode === modes.checkboxMulti) {

		const clearSelections = selectionModelDefaults.mode === modes.checkboxSingle;

		return { type: SET_SELECTION, id ,clearSelections };
	}
}