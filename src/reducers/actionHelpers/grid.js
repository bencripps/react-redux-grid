import { generateLastUpdate } from './../../util/lastUpdate';

import { Grid } from './../../records';

import
    localStorageManager
from './../../components/core/LocalStorageManager';

const debouncedColumnSetter = localStorageManager.debouncedSetStateItem();

export const hideHeader = (state, { stateKey, headerHidden }) =>
    state.setIn([stateKey], new Grid({
        headerHidden: headerHidden,
        lastUpdate: generateLastUpdate()
    }));

export const setColumns = (state, { columns, stateKey, stateful }) => {
    if (stateful) {
        setColumnsInStorage({
            stateKey: stateKey,
            columns: columns
        });
    }

    return state.setIn([stateKey], new Grid({
        columns: columns,
        lastUpdate: generateLastUpdate()
    }));
};

export const setSortDirection = (state, { stateKey, columns }) =>
    state.setIn([stateKey], new Grid({
        columns: columns,
        lastUpdate: generateLastUpdate()
    }));

export const resizeColumns = (state, { stateful, stateKey, columns }) => {
    if (stateful) {
        setColumnsInStorage({
            stateKey: stateKey,
            columns: columns
        });
    }

    return state.setIn([stateKey], new Grid({
        columns: columns,
        lastUpdate: generateLastUpdate()
    }));
};

export const setColumnsInStorage = ({ columns, stateKey }) => {
    debouncedColumnSetter({
        stateKey: stateKey,
        property: 'columns',
        value: columns
    });
};
