import { camelize } from './camelize';

export const getData = (
    rowData = {}, columns = {}, colIndex = 0
) => {

    const column = columns[colIndex];

    if (!column) {
        return undefined;
    }

    const dataIndex = column.dataIndex || null;

    if (!dataIndex) {
        throw new Error('No dataIndex found on column', column);
    }

    if (typeof dataIndex === 'string') {
        return rowData
            && rowData[dataIndex] !== undefined
            ? rowData[dataIndex]
            : null;
    }

    else if (Array.isArray(dataIndex)) {
        return getValueFromDataIndexArr(rowData, dataIndex);
    }

};

export const setKeysInData = (data) => {
    if (!data || !Array.isArray(data)) {
        return [];
    }

    if (data[0] && data[0]._key === undefined) {
        data.forEach((row, i) => {
            row._key = 'row-' + i;
        });
    }

    return data;
};

export const getRowKey = (columns, rowValues, suffix) => {

    const uniqueCol = columns.filter(col => col.createKeyFrom);
    let val = rowValues._key;

    if (uniqueCol.length > 1) {
        throw new Error('Only one column can declare createKeyFrom');
    }

    if (uniqueCol.length > 0) {
        const dataIndex = nameFromDataIndex(uniqueCol[0]);
        val = rowValues && rowValues[dataIndex]
            ? rowValues[dataIndex]
            : rowValues._key;
    }

    if (suffix) {
        val = `${val}-${suffix}`;
    }

    return val;
};

export const setDataAtDataIndex = (rowData = {}, dataIndex, val) => {

    if (typeof dataIndex === 'string') {
        rowData[dataIndex] = val;
        return rowData;
    }

    let temp = rowData;

    for (let i = 0; i < dataIndex.length - 1; i++) {
        temp = temp[dataIndex[i]];
    }

    if (!temp[dataIndex[[dataIndex.length - 1]]]) {
        throw new Error('Invalid key path');
    }

    temp[dataIndex[dataIndex.length - 1]] = val;

    return rowData;
};

export const getValueFromDataIndexArr = (rowData, dataIndex) => {
    let temp = rowData;

    for (let i = 0; i < dataIndex.length; i++) {

        if (!temp[dataIndex[i]]) {
            // preferring silent failure on get
            // but we throw an error on the update
            // if the key path is invalid
            return '';
        }

        temp = temp[dataIndex[i]];
    }

    return temp;
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
