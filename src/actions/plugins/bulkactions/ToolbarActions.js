import {
    REMOVE_TOOLBAR
} from '../../../constants/ActionTypes';

export const removeToolbar = ({ state, stateKey }) => ({
    type: REMOVE_TOOLBAR, value: state, stateKey
});
