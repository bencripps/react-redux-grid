import { Loader } from './../../../records';
import { generateLastUpdate } from './../../../util/lastUpdate';
import getUpdatedRecord from './../../../util/getUpdatedRecord';

export const setLoading = (state, { stateKey, state: loadingState }) =>
    getUpdatedRecord(state, stateKey, {
        isLoading: loadingState,
        lastUpdate: generateLastUpdate()
    }, Loader);
