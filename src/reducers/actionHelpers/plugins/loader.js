import { fromJS } from 'immutable';
import { generateLastUpdate } from './../../../util/lastUpdate';

export const setLoading = (state, { stateKey, state: loadingState }) =>
    state.setIn([stateKey], fromJS({
        isLoading: loadingState,
        lastUpdate: generateLastUpdate()
    }));
