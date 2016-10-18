import { fromJS, Map } from 'immutable';
import { generateLastUpdate } from './../../../util/lastUpdate';

import {
    getData,
    setDataAtDataIndex,
    setKeysInData
} from './../../../util/getData';

export const editRow = (state, {
    columns, editMode, rowIndex, rowId, stateKey, top, isCreate, values
}) => {

    const isValid = isRowValid(columns, values);
    const iOverrides = state.getIn([stateKey, rowId, 'overrides'])
       ? state.getIn([stateKey, rowId, 'overrides']).toJS()
       : {};

    columns.forEach((col, i) => {
        const val = getData(values, columns, i);
        const dataIndex = col.dataIndex;

        // setting disabled
        iOverrides[dataIndex] = iOverrides[dataIndex] || {};
        iOverrides[dataIndex].disabled = setDisabled(col, val, values);
    });

    const operation = editMode === 'inline'
       ? 'setIn'
       : 'mergeIn';

    return state[operation]([stateKey], fromJS({
        [rowId]: {
            key: rowId,
            values,
            rowIndex,
            top,
            valid: isValid,
            isCreate: isCreate || false,
            overrides: iOverrides
        },
        lastUpdate: generateLastUpdate()
    }));

};

export const setData = (state, { data, editMode, stateKey }) => {
    if (editMode === 'grid') {

        const keyedData = setKeysInData(data);
        const editorData = keyedData.reduce((prev, curr, i) => {
            return prev.set(curr.get('_key'), fromJS({
                key: curr.get('_key'),
                values: curr,
                rowIndex: i,
                top: null,
                valid: null,
                isCreate: false,
                overrides: {}
            }));
        }, Map({ lastUpdate: generateLastUpdate() }));

        return state.mergeIn([stateKey], editorData);
    }

    return state;
};

export const rowValueChange = (state, {
    column, columns, value, rowId, stateKey
}) => {

    const previousValues = state.getIn([stateKey, rowId, 'values'])
        ? state.getIn([stateKey, rowId, 'values']).toJS()
        : {};
    const overrides = state.getIn([stateKey, rowId, 'overrides'])
        ? state.getIn([stateKey, rowId, 'overrides']).toJS()
        : {};

    let rowValues = setDataAtDataIndex(
        previousValues, column.dataIndex, value
    );

    columns.forEach((col, i) => {
        const val = getData(rowValues, columns, i);
        const dataIndex = col.dataIndex;

        // interpreting `change func` to set final values
        // happens first, due to other validation
        rowValues = handleChangeFunc(col, rowValues);

        // setting default value
        if (col.defaultValue !== undefined
            && val === undefined || val === null) {
            setDataAtDataIndex(rowValues, dataIndex, col.defaultValue);
        }

        // setting disabled
        overrides[dataIndex] = overrides[dataIndex] || {};
        overrides[dataIndex].disabled = setDisabled(col, val, rowValues);

    });

    const valid = isRowValid(columns, rowValues);

    state = state.mergeIn([stateKey, rowId], {
        values: rowValues,
        previousValues: state.getIn([stateKey, rowId, 'values']),
        valid,
        overrides
    });

    return state.setIn(
        [stateKey, 'lastUpdate'],
        generateLastUpdate()
    );
};

export const repositionEditor = (state, { rowId, stateKey, top }) => {
    const newState = state.mergeIn([stateKey, rowId], {
        top: top
    });

    return newState.mergeIn(
        [stateKey],
        { lastUpdate: generateLastUpdate() }
    );
};

export const removeEditorState = (state, { stateKey }) => state.setIn(
        [stateKey],
        fromJS({ lastUpdate: generateLastUpdate() }));

// helpers
export const isCellValid = ({validator }, value, values) => {
    if (!validator || !typeof validator === 'function') {
        return true;
    }

    return validator({ value, values });
};

export const isRowValid = (columns, rowValues) => {
    for (let i = 0; i < columns.length; i++) {

        const col = columns[i];
        const val = isCellValid(col, getData(rowValues, columns, i), rowValues);

        if (!val) {
            return false;
        }
    }

    return true;
};

export const setDisabled = (col = {}, value, values) => {

    if (col.disabled === true || col.disabled === 'false') {
        return col.disabled;
    }

    if (typeof col.disabled === 'function') {
        return col.disabled({ column: col, value, values });
    }

    return false;

};

export const handleChangeFunc = (col, rowValues) => {

    if (!col.change || !typeof col.change === 'function') {
        return rowValues;
    }

    const overrideValue = col.change({ values: rowValues }) || {};

    Object.keys(overrideValue).forEach(k => {
        rowValues[k] = overrideValue[k];
    });

    return rowValues;
};
