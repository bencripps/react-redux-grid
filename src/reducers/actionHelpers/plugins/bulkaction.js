import { BulkAction } from './../../../records';
import { generateLastUpdate } from './../../../util/lastUpdate';
import getUpdatedRecord from './../../../util/getUpdatedRecord';

export const removeToolbar = (state, { stateKey, value }) =>
    getUpdatedRecord(state, stateKey, {
        isRemoved: value,
        lastUpdate: generateLastUpdate()
    }, BulkAction);
