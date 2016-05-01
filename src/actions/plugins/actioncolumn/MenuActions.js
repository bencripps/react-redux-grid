import {
    SHOW_MENU,
    HIDE_MENU
} from '../../../constants/ActionTypes';

export function showMenu({ id, stateKey }) {
    return { type: SHOW_MENU, id, stateKey };
}

export function hideMenu({ id, stateKey }) {
    return { type: HIDE_MENU, id, stateKey };
}