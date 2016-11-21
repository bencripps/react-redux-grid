import { Map, List, fromJS } from 'immutable';
import { camelize } from './camelize';

export const getData = (
    row = new Map(), columns = {}, colIndex = 0, editorValues = {}
) => {

    if (!row.get) {
        row = fromJS(row);
    }

    const column = columns[colIndex];

    if (!column) {
        return undefined;
    }

    const dataIndex = column.dataIndex || null;

    if (!dataIndex) {
        throw new Error('No dataIndex found on column', column);
    }

    if (editorValues
        && editorValues.get
        && editorValues.get(dataIndex) !== undefined) {
        return editorValues.get(dataIndex);
    }

    if (typeof dataIndex === 'string') {
        const val = row
            && row.get
            && row.get(dataIndex) !== undefined
            ? row.get(dataIndex)
            : null;

        return val && val.toJS ? val.toJS() : val;
    }

    else if (Array.isArray(dataIndex)) {
        const val = getValueFromDataIndexArr(row, dataIndex);
        return val && val.toJS ? val.toJS() : val;
    }

};

export const setKeysInData = (data) => {

    if (List.isList(data)) {

        if (data.getIn([0, '_key'])) {
            return data;
        }

        return data.map((item, i) => item.set('_key', `row-${i}`));
    }

    if (!data || !Array.isArray(data)) {
        return List([]);
    }

    if (data[0] && data[0]._key === undefined) {
        data.forEach((row, i) => {
            row._key = `row-${i}`;
        });
    }

    return fromJS(data);
};

export const getRowKey = (columns, rowValues, suffix) => {

    const uniqueCol = columns.filter(col => col.createKeyFrom);
    let val = rowValues.get('_key');

    if (uniqueCol.length > 1) {
        throw new Error('Only one column can declare createKeyFrom');
    }

    if (uniqueCol.length > 0) {
        const dataIndex = nameFromDataIndex(uniqueCol[0]);
        val = rowValues && rowValues.get(dataIndex)
            ? rowValues.get(dataIndex)
            : rowValues.get('_key');
    }

    if (suffix) {
        val = `${val}-${suffix}`;
    }

    return val;
};

export const setDataAtDataIndex = (row, dataIndex, val) => {

    if (!row.toJS) {
        row = fromJS(row);
    }

    if (typeof dataIndex === 'string') {
        return row.set(dataIndex, val);
    }

    if (row.getIn(dataIndex)) {
        return row.setIn(dataIndex, val);
    }

    throw new Error('Invalid key path');
};

export const getValueFromDataIndexArr = (row, dataIndex) => {
    const val = row.getIn(dataIndex);

    return val !== undefined
        ? val
        : '';
};

export const nameFromDataIndex = (column) => {

    if (!column) {
        return '';
    }

    if (typeof column.dataIndex === 'string') {
        return column.dataIndex;
    }

    if (Array.isArray(column.dataIndex)) {
        return column.dataIndex[column.dataIndex.length - 1];
    }

    if (!column.dataIndex) {
        return camelize(column.name);
    }

};
