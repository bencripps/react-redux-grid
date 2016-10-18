import { generateLastUpdate } from './../../../util/lastUpdate';

export const pageLocal = (state, { pageIndex, stateKey }) =>
    state.mergeIn([stateKey], {
        pageIndex: pageIndex,
        lastUpdate: generateLastUpdate()
    });

export const pageRemote = (state, { pageIndex, stateKey }) =>
    state.mergeIn([stateKey], {
        pageIndex: pageIndex,
        lastUpdate: generateLastUpdate()
    });
