import { BulkAction } from './../../../records';
import { generateLastUpdate } from './../../../util/lastUpdate';

export const removeToolbar = (state, { stateKey, value }) =>
    state.setIn([stateKey], new BulkAction({
        isRemoved: value,
        lastUpdate: generateLastUpdate()
    }));
