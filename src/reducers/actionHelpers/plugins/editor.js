import { fromJS, Map, List } from 'immutable';

import { Editor } from './../../../records';
import { generateLastUpdate } from './../../../util/lastUpdate';

import {
    getData,
    setDataAtDataIndex,
    setKeysInData,
    nameFromDataIndex
} from './../../../util/getData';

export const editRow = (state, {
    columns, editMode, rowIndex, rowId, stateKey, top, isCreate, values
}) => {

    if (!values.toJS) {
        values = fromJS(values);
    }

    const { invalidCells, isValid } = isRowValid(columns, values);

    let overrides = state.getIn([stateKey, rowId, 'overrides'])
        ? state.getIn([stateKey, rowId, 'overrides'])
        : new Map();

    columns.forEach((col, i) => {
        const val = getData(values, columns, i);
        const dataIndex = col.dataIndex;

        // setting disabled
        if (!overrides.get(dataIndex)) {
            overrides = overrides.set(dataIndex, new Map());
        }

        overrides = overrides.setIn(
            [dataIndex, 'disabled'],
            setDisabled(col, val, values)
        );
    });

    const operation = editMode === 'inline'
        ? 'setIn'
        : 'mergeIn';

    return state[operation]([stateKey], fromJS({
        [rowId]: new Editor({
            key: rowId,
            values: fromJS(values),
            rowIndex,
            top,
            valid: isValid,
            invalidCells,
            isCreate: isCreate || false,
            overrides: overrides
        }),
        lastUpdate: generateLastUpdate()
    }));

};

export const setData = (state, { data, editMode, stateKey }) => {
    if (editMode === 'grid') {

        const keyedData = setKeysInData(data);
        const editorData = keyedData.reduce((prev, curr, i) => {
            return prev.set(curr.get('_key'), new Editor({
                key: curr.get('_key'),
                values: curr,
                rowIndex: i,
                top: null,
                valid: null,
                isCreate: false,
                overrides: Map()
            }));
        }, Map({ lastUpdate: generateLastUpdate() }));

        return state.mergeIn([stateKey], editorData);
    }

    return state;
};

export const rowValueChange = (state, {
    column, columns, value, rowId, stateKey
}) => {

    const colTriggeringChange = nameFromDataIndex(column);
    const previousEditorState = state.getIn([stateKey, rowId]);
    const previousValues = previousEditorState
        ? previousEditorState.values
        : new Map();

    let overrides = previousEditorState
        ? previousEditorState.overrides
        : new Map();

    let rowValues = setDataAtDataIndex(
        previousValues, column.dataIndex, value
    );

    columns.forEach((col, i) => {
        const val = getData(rowValues, columns, i);
        const dataIndex = nameFromDataIndex(col);

        // interpreting `change func` to set final values
        // happens first, due to other validation
        // need to turn back to immutable, since data is
        // being retrieved externally
        rowValues = fromJS(
            handleChangeFunc(col, rowValues, colTriggeringChange)
        );

        // setting default value
        if (col.defaultValue !== undefined
            && val === undefined || val === null) {
            rowValues = setDataAtDataIndex(
                rowValues, dataIndex, col.defaultValue
            );
        }

        // setting disabled
        if (!overrides || !overrides.get) {
            overrides = new Map();
        }

        if (!overrides.get(dataIndex)) {
            overrides = overrides.set(dataIndex, Map());
        }

        overrides = overrides.setIn(
            [dataIndex, 'disabled'], setDisabled(col, val, rowValues)
        );
    });

    const { invalidCells, isValid } = isRowValid(columns, rowValues);

    const record = state.getIn([stateKey, rowId]) || new Editor();
    const updated = record.merge({
        values: rowValues,
        previousValues: record.values,
        valid: isValid,
        invalidCells,
        overrides
    });

    state = state.setIn([stateKey, rowId], updated);

    return state.setIn(
        [stateKey, 'lastUpdate'],
        generateLastUpdate()
    );
};

export const repositionEditor = (state, { rowId, stateKey, top }) => {
    const record = state.getIn([stateKey, rowId]);
    const updated = record.merge({ top });
    const newState = state.mergeIn([stateKey, rowId], updated);

    return newState.mergeIn(
        [stateKey],
        { lastUpdate: generateLastUpdate() }
    );
};

export const removeEditorState = (state, { stateKey }) => state.setIn(
    [stateKey],
    fromJS({ lastUpdate: generateLastUpdate() }));

// helpers
export const isCellValid = ({ validator }, value, values) => {
    if (!validator || !typeof validator === 'function') {
        return true;
    }

    const vals = values && values.toJS
        ? values.toJS()
        : values;

    return validator({ value, values: vals });
};

export const isRowValid = (columns, rowValues) => {
    let invalidCells = new List();
    let isValid = true;

    for (let i = 0; i < columns.length; i++) {

        const col = columns[i];
        const val = isCellValid(col, getData(rowValues, columns, i), rowValues);

        if (!val) {
            invalidCells = invalidCells.push(nameFromDataIndex(col));
        }
        if (isValid && !val) {
            isValid = false;
        }
    }

    return { isValid, invalidCells };
};

export const setDisabled = (col = {}, value, values) => {

    if (col.disabled === true || col.disabled === 'false') {
        return col.disabled;
    }

    if (typeof col.disabled === 'function') {

        const vals = values && values.toJS
            ? values.toJS()
            : values;

        return col.disabled({
            column: col,
            value,
            values: vals
        });
    }

    return false;

};

export const handleChangeFunc = (col, rowValues, colTriggeringChange) => {

    const vals = rowValues
        && rowValues.toJS
        ? rowValues.toJS()
        : rowValues;

    if (!col.change || !typeof col.change === 'function') {
        return vals;
    }

    const overrideValue = col.change({ values: vals, eventSource: col }) || {};

    Object.keys(overrideValue).forEach(k => {
        // if the change is originating
        // from a the column that we want to override
        // ignore that specific change value
        if (k !== colTriggeringChange) {
            vals[k] = overrideValue[k];
        }
    });

    return vals;
};
