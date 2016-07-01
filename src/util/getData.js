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
            throw new Error('Invalid key path');
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
