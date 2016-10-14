import {
    SET_LOADING_STATE
} from '../../../constants/ActionTypes';

export const setLoaderState = ({ state, stateKey }) => ({
    type: SET_LOADING_STATE, state, stateKey
});
