import { fromJS, List } from 'immutable';
import { generateLastUpdate } from './../../util/lastUpdate';

import { DataSource } from './../../records';

import { getTreePathFromId } from './../../util/getTreePathFromId';
import { moveTreeNode } from './../../util/moveTreeNode';
import { setTreeValue } from './../../util/setTreeValue';
import { treeToFlatList } from './../../util/treeToFlatList';
import { setKeysInData } from './../../util/getData';

export const setData = (state, {
    currentRecords, data, gridType, stateKey, treeData, total
}) => {

    const keyedData = setKeysInData(data);
    let keyedCurr;

    if (currentRecords) {
        keyedCurr = setKeysInData(currentRecords);
    }

    return state.setIn([stateKey], new DataSource({
        data: keyedData,
        proxy: keyedData,
        total: total || keyedData.count(),
        treeData: fromJS(treeData),
        gridType: gridType || 'grid',
        currentRecords: keyedCurr
            ? keyedCurr
            : keyedData,
        lastUpdate: generateLastUpdate()
    }));
};

export const setPartialTreeData = (state, {
    data, parentId, showTreeRootNode, stateKey
}) => {

    const tree = state.getIn([stateKey, 'treeData']);
    const flat = state.getIn([stateKey, 'data']);
    const pathToNode = [
        -1, ...getTreePathFromId(flat, parentId)
    ];
    const updatedTree = setTreeValue(
        tree, pathToNode, { children: data }
    );

    let updatedFlat = treeToFlatList(updatedTree);

    if (!showTreeRootNode) {
        updatedFlat = updatedFlat.shift();
    }

    const record = state.get(stateKey).merge({
        data: updatedFlat,
        currentRecords: updatedFlat,
        treeData: updatedTree,
        proxy: updatedFlat,
        total: updatedFlat.count(),
        lastUpdate: generateLastUpdate()
    });

    return state.setIn([stateKey], record);
};

export const dismissEditor = (state, { stateKey }) => {
    const previousData = state.getIn([stateKey, 'data']);
    const previousProxy = state.getIn([stateKey, 'proxy']);
    let previousTotal = state.getIn([stateKey, 'total']);

    // upon dismiss, if a new row was in edit
    // but isn't save, update the total to reflect that
    if (previousData
        && previousProxy
        && previousData.size > previousProxy.size) {
        previousTotal = previousProxy.size;
    }

    const record = state.get(stateKey);

    if (record) {
        const updated = record.merge({
            data: previousProxy,
            proxy: previousProxy,
            currentRecords: previousProxy,
            total: previousTotal,
            isEditing: false,
            lastUpdate: generateLastUpdate()
        });

        return state.setIn([stateKey], updated);
    }

    return state;
};

export const removeRow = (state, { stateKey, rowIndex }) => {
    const remainingRows = state
        .getIn([stateKey, 'data'])
        .remove(rowIndex || 0, 1);

    const record = state.get(stateKey);

    const updated = record.merge({
        data: remainingRows,
        proxy: remainingRows,
        currentRecords: remainingRows,
        lastUpdate: generateLastUpdate()
    });

    return state.setIn([stateKey], updated);
};

export const updateRow = (state, { rowIndex, stateKey, values }) => {

    const data = state.getIn([stateKey, 'data']);
    const row = data
        ? data.get(rowIndex)
        : null;

    if (!row) {
        return state;
    }

    const updatedRow = row.merge(values);
    const updatedData = state.getIn([stateKey, 'data'])
        .set(rowIndex, updatedRow);

    const record = state.get(stateKey);

    const updated = record.merge({
        data: updatedData,
        proxy: updatedData,
        currentRecords: updatedData,
        lastUpdate: generateLastUpdate()
    });

    return state.setIn([stateKey], updated);
};

export const addNewRow = (state, { rowId, stateKey, rowIndex }) => {
    const existingState = state.get(stateKey);
    const isEditing = existingState && existingState.get('isEditing');
    let data = existingState && existingState.get('data');

    if (existingState && isEditing) {
        return state;
    }

    let newRow = data
        && data.size > 0
        && data.get(0)
        ? data.get(0).reduce((p, i, c) => { return p.set(c, ''); }, fromJS({}))
        : fromJS({});

    newRow = newRow.set('_key', rowId);

    if (!data) {
        data = new List();
    }

    rowIndex = rowIndex ===undefined
        ? 0
        : rowIndex;

    const newData = data.insert(rowIndex, newRow);
    const updated = existingState.merge({
        data: newData,
        proxy: data,
        isEditing: true,
        lastUpdate: generateLastUpdate(),
        total: newData.size
    });

    return state.setIn([stateKey], updated);
};

export const moveNode = (state, {
    current, next, showTreeRootNode, stateKey
}) => {
    const nextPath = List(next.path);
    const tree = state.getIn([stateKey, 'treeData']);
    const currentPath = List(current.path);

    const newTreeMove = moveTreeNode(
        tree,
        current.index,
        currentPath,
        next.index,
        nextPath
    );

    let flatMove = treeToFlatList(newTreeMove);

    // remove root-node
    if (!showTreeRootNode) {
        flatMove = flatMove.shift();
    }

    const record = state.get(stateKey);
    const updated = record.merge({
        data: flatMove,
        currentRecords: flatMove,
        treeData: newTreeMove,
        proxy: flatMove,
        lastUpdate: generateLastUpdate()
    });

    return state.setIn([stateKey], updated);
};

export const setTreeNodeVisibility = (state, {
    id, showTreeRootNode, stateKey
}) => {

    const flat = state.getIn([stateKey, 'data']);
    const tree = state.getIn([stateKey, 'treeData']);

    const currentVisibility = !!flat
        .find(node => node.get('_id') === id).get('_hideChildren');

    const path = [-1, ...getTreePathFromId(flat, id)];

    const updatedTree = setTreeValue(
        tree, path, { _hideChildren: !currentVisibility }
    );

    let updatedList = treeToFlatList(updatedTree);

    // remove root-node
    if (!showTreeRootNode) {
        updatedList = updatedList.shift();
    }

    const record = state.get(stateKey);
    const updated = record.merge({
        data: updatedList,
        currentRecords: updatedList,
        treeData: updatedTree,
        proxy: updatedList,
        lastUpdate: generateLastUpdate()
    });

    return state.setIn([stateKey], updated);
};

export const saveRow = (state, { rowIndex, stateKey, values}) => {
    const data = state
        .getIn([stateKey, 'data'])
        .set(rowIndex, fromJS(values));

    const record = state.get(stateKey);
    const updated = record.merge({
        data: data,
        proxy: data,
        currentRecords: data,
        lastUpdate: generateLastUpdate()
    });

    return state.setIn([stateKey], updated);
};

export const sortData = (state, { data, stateKey }) => {

    const record = state.get(stateKey);
    const updated = record.merge({
        data: data,
        lastUpdate: generateLastUpdate()
    });

    return state.setIn([stateKey], updated);
};

export const clearFilter = (state, { stateKey }) => {
    const proxy = state.getIn([stateKey, 'proxy']);
    const prevData = state.getIn([stateKey, 'data']);
    const recs = proxy || prevData;

    const record = state.get(stateKey);
    const updated = record.merge({
        data: recs,
        proxy: recs,
        currentRecords: recs,
        lastUpdate: generateLastUpdate()
    });

    return state.setIn([stateKey], updated);
};

export const filterData = (state, { data, stateKey }) => {
    const record = state.get(stateKey);
    const updated = record.merge({
        data: data,
        lastUpdate: generateLastUpdate()
    });

    return state.setIn([stateKey], updated);
};
