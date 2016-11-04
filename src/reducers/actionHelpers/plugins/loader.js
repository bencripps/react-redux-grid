import { Loader } from './../../../records';
import { generateLastUpdate } from './../../../util/lastUpdate';

export const setLoading = (state, { stateKey, state: loadingState }) =>
    state.setIn([stateKey], new Loader({
        isLoading: loadingState,
        lastUpdate: generateLastUpdate()
    }));
