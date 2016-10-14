import {
    DISMISS_ERROR
} from '../../../constants/ActionTypes';

export const dismissError = ({ stateKey }) => ({
    type: DISMISS_ERROR, stateKey
});
