import {
    SHOW_TOOLBAR,
    HIDE_TOOLBAR
} from '../../../constants/ActionTypes';

export function showToolbar() {
    return { type: SHOW_TOOLBAR };
};

export function hideToolbar() {
    return { type: HIDE_TOOLBAR };
};