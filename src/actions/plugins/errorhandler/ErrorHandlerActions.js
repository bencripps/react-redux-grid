import {
    DISMISS_ERROR
} from '../../../constants/ActionTypes';

export function dismissError({ stateKey }) {
    return { type: DISMISS_ERROR, stateKey };
}
