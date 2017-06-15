import { generateLastUpdate } from './../../util/lastUpdate';

import { Grid } from './../../records';

import localStorageManager from './../../components/core/LocalStorageManager'; // eslint-disable-line
import getUpdatedRecord from './../../util/getUpdatedRecord';

const debouncedColumnSetter = localStorageManager.debouncedSetStateItem();

export const hideHeader = (state, { stateKey, headerHidden }) =>
    getUpdatedRecord(
        state, stateKey, {
            headerHidden: headerHidden,
            lastUpdate: generateLastUpdate()
        },
        Grid
    );

export const setColumns = (state, { columns, stateKey, stateful }) => {
    if (stateful) {
        setColumnsInStorage({
            stateKey: stateKey,
            columns: columns
        });
    }

    return getUpdatedRecord(state, stateKey, {
        columns: columns,
        lastUpdate: generateLastUpdate()
    }, Grid);
};

export const setSortDirection = (state, { stateKey, columns }) =>
    getUpdatedRecord(state, stateKey, {
        columns: columns,
        lastUpdate: generateLastUpdate()
    }, Grid);

export const resizeColumns = (state, { stateful, stateKey, columns }) => {
    if (stateful) {
        setColumnsInStorage({
            stateKey: stateKey,
            columns: columns
        });
    }

    return getUpdatedRecord(state, stateKey, {
        columns: columns,
        lastUpdate: generateLastUpdate()
    }, Grid);
};

export const setColumnsInStorage = ({ columns, stateKey }) => {
    debouncedColumnSetter({
        stateKey: stateKey,
        property: 'columns',
        value: columns
    });
};
