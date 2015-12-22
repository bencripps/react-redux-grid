import {
    SET_SELECTION
} from '../../../constants/ActionTypes';


export function setSelection(id, selectionModelDefaults) {

	if (selectionModelDefaults.mode === 'single') {
    	return { type: SET_SELECTION, id, clear: true  };
	}

	else if (selectionModelDefaults.mode === 'multi') {
		return { type: SET_SELECTION, id }; 
	}
}