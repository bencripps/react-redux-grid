import { Menu } from './../../../records';
import { generateLastUpdate } from './../../../util/lastUpdate';
import getUpdatedRecord from './../../../util/getUpdatedRecord';

export const showMenu = (state, { stateKey, id }) =>
    getUpdatedRecord(state, stateKey, {
        [id]: true,
        lastUpdate: generateLastUpdate()
    }, Menu);

export const hideMenu = (state, { stateKey, id }) =>
    getUpdatedRecord(state, stateKey, {
        [id]: false,
        lastUpdate: generateLastUpdate()
    }, Menu);

