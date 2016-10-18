import { fromJS } from 'immutable';
import { generateLastUpdate } from './../../util/lastUpdate';

import
    localStorageManager
from './../../components/core/LocalStorageManager';

const debouncedColumnSetter = localStorageManager.debouncedSetStateItem();

export const hideHeader = (state, { stateKey, headerHidden }) =>
    state.mergeIn([stateKey], fromJS({
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

    return state.mergeIn([stateKey], fromJS({
        columns: columns,
        lastUpdate: generateLastUpdate()
    }));
};

export const setSortDirection = (state, { stateKey, columns }) =>
    state.mergeIn([stateKey], fromJS({
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

    return state.mergeIn([stateKey], fromJS({
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
