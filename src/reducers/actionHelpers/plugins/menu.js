import { Menu } from './../../../records';
import { generateLastUpdate } from './../../../util/lastUpdate';

export const showMenu = (state, { stateKey, id }) =>
    state.setIn([stateKey], new Menu({
        [id]: true,
        lastUpdate: generateLastUpdate()
    }));

export const hideMenu = (state, { stateKey, id }) =>
    state.setIn([stateKey], new Menu({
        [id]: false,
        lastUpdate: generateLastUpdate()
    }));

