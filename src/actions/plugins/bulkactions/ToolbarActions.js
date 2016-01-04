import {
    REMOVE_TOOLBAR
} from '../../../constants/ActionTypes';

export function removeToolbar(value) {
    return { type: REMOVE_TOOLBAR, value };
}