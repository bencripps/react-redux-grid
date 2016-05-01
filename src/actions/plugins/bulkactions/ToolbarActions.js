import {
    REMOVE_TOOLBAR
} from '../../../constants/ActionTypes';

export function removeToolbar({ state, stateKey }) {
    return { type: REMOVE_TOOLBAR, value: state, stateKey };
}