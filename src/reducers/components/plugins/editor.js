import { fromJS, Map } from 'immutable';

import {
    EDIT_ROW,
    DISMISS_EDITOR,
    ROW_VALUE_CHANGE,
    CANCEL_ROW,
    REMOVE_ROW,
    REPOSITION_EDITOR,
    SET_DATA
} from '../../../constants/ActionTypes';

import {
    getData,
    setDataAtDataIndex,
    setKeysInData
} from './../../../util/getData';

import { generateLastUpdate } from './../../../util/lastUpdate';

const initialState = fromJS({
    lastUpdate: generateLastUpdate()
});

export const isCellValid = ({ validator }, value, values) => {
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

export default function editor(state = initialState, action) {

    switch (action.type) {

    case EDIT_ROW:

        const { values } = action;
        const isValid = isRowValid(action.columns, values);
        const iOverrides = state.getIn([stateKey, action.rowId, 'overrides'])
            ? state.getIn([stateKey, action.rowId, 'overrides']).toJS()
            : {};

        action.columns.forEach((col, i) => {
            const val = getData(values, action.columns, i);
            const dataIndex = col.dataIndex;

            // setting disabled
            iOverrides[dataIndex] = iOverrides[dataIndex] || {};
            iOverrides[dataIndex].disabled = setDisabled(col, val, values);
        });

        const operation = action.editMode === 'inline'
            ? 'setIn'
            : 'mergeIn';

        return state[operation]([action.stateKey], fromJS({
            [action.rowId]: {
                key: action.rowId,
                values: action.values,
                rowIndex: action.rowIndex,
                top: action.top,
                valid: isValid,
                isCreate: action.isCreate || false,
                overrides: iOverrides
            },
            lastUpdate: generateLastUpdate()
        }));

    case SET_DATA:

        // if grid editor is type 'grid', we need to map the datasource
        // to editor state
        if (action.editMode === 'grid') {

            const dataWithKeys = setKeysInData(action.data);
            const editorData = dataWithKeys.reduce((prev, curr, i) => {
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

            return state.mergeIn([action.stateKey], editorData);
        }

        return state;

    case ROW_VALUE_CHANGE:

        const { column, columns, value, stateKey } = action;
        const previousValues = state.getIn([stateKey, action.rowId, 'values'])
            ? state.getIn([stateKey, action.rowId, 'values']).toJS()
            : {};
        const overrides = state.getIn([stateKey, action.rowId, 'overrides'])
            ? state.getIn([stateKey, action.rowId, 'overrides']).toJS()
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

        state = state.mergeIn([action.stateKey, action.rowId], {
            values: rowValues,
            previousValues: state.getIn([stateKey, action.rowId, 'values']),
            valid,
            overrides
        });

        return state.setIn(
            [action.stateKey, 'lastUpdate'],
            generateLastUpdate()
        );

    case REPOSITION_EDITOR:
        const newState = state.mergeIn([action.stateKey, action.rowId], {
            top: action.top
        });

        return newState.mergeIn(
            [action.stateKey],
            { lastUpdate: generateLastUpdate() }
        );

    case REMOVE_ROW:
    case DISMISS_EDITOR:
    case CANCEL_ROW:
        return state.setIn(
            [action.stateKey],
            fromJS({ lastUpdate: generateLastUpdate() })
        );

    default:
        return state;
    }
}
