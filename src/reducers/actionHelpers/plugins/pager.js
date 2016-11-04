import { Pager } from './../../../records';
import { generateLastUpdate } from './../../../util/lastUpdate';

export const pageLocal = (state, { pageIndex, stateKey }) =>
    state.mergeIn([stateKey], new Pager({
        pageIndex: pageIndex,
        lastUpdate: generateLastUpdate()
    }));

export const pageRemote = (state, { pageIndex, stateKey }) =>
    state.mergeIn([stateKey], new Pager({
        pageIndex: pageIndex,
        lastUpdate: generateLastUpdate()
    }));
