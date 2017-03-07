import { Pager } from './../../../records';
import { generateLastUpdate } from './../../../util/lastUpdate';
import getUpdatedRecord from './../../../util/getUpdatedRecord';

export const pageLocal = (state, { pageIndex, stateKey }) =>
    getUpdatedRecord(state, stateKey, {
        pageIndex,
        lastUpdate: generateLastUpdate()
    }, Pager);

export const pageRemote = (state, { pageIndex, stateKey }) =>
    getUpdatedRecord(state, stateKey, {
        pageIndex,
        lastUpdate: generateLastUpdate()
    }, Pager);
