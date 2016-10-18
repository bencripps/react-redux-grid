import { fromJS, List } from 'immutable';
import { generateLastUpdate } from './../../util/lastUpdate';

import { getTreePathFromId } from './../../util/getTreePathFromId';
import { moveTreeNode } from './../../util/moveTreeNode';
import { setTreeValue } from './../../util/setTreeValue';
import { treeToFlatList } from './../../util/treeToFlatList';
import { setKeysInData } from './../../util/getData';

export const setData = (state, {
    currentRecords, data, gridType, stateKey, treeData, total
}) => {

    const keyedData = setKeysInData(data);

    return state.setIn([stateKey], fromJS({
        data: keyedData,
        proxy: keyedData,
        total: total || keyedData.count(),
        treeData: treeData,
        gridType: gridType || 'grid',
        currentRecords: currentRecords
            ? List(currentRecords)
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

    return state.mergeIn([stateKey], {
        data: updatedFlat,
        currentRecords: updatedFlat,
        treeData: updatedTree,
        proxy: updatedFlat,
        total: updatedFlat.count(),
        lastUpdate: generateLastUpdate()
    });
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

    if (state.get(stateKey)) {
        return state.mergeIn([stateKey], fromJS({
            data: previousProxy,
            proxy: previousProxy,
            currentRecords: previousProxy,
            total: previousTotal,
            isEditing: false,
            lastUpdate: generateLastUpdate()
        }));
    }

    return state;
};

export const removeRow = (state, { stateKey, rowIndex }) => {
    const remainingRows = state
        .getIn([stateKey, 'data'])
        .remove(rowIndex || 0, 1);

    return state.mergeIn([stateKey], fromJS({
        data: remainingRows,
        proxy: remainingRows,
        currentRecords: remainingRows,
        lastUpdate: generateLastUpdate()
    }));
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

    return state.mergeIn([stateKey], {
        data: updatedData,
        proxy: updatedData,
        currentRecords: updatedData,
        lastUpdate: generateLastUpdate()
    });

};

export const addNewRow = (state, { rowId, stateKey }) => {
    const existingState = state.get(stateKey);
    const isEditing = existingState && existingState.get('isEditing');
    let data = existingState && existingState.get('data');

    if (existingState && isEditing) {
        return state;
    }

    let newRow = data
        && data.size > 0
        && data.get(0)
        ? data.get(0).map((k, v) => v = '')
        : fromJS({});

    newRow = newRow.set('_key', rowId);

    if (!data) {
        data = new List();
    }

    const newData = data.unshift(newRow);

    return state.mergeIn([stateKey], fromJS({
        data: newData,
        proxy: data,
        isEditing: true,
        lastUpdate: generateLastUpdate(),
        total: newData.size
    }));
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

    return state.mergeIn([stateKey], {
        data: flatMove,
        currentRecords: flatMove,
        treeData: newTreeMove,
        proxy: flatMove,
        lastUpdate: generateLastUpdate()
    });
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
        tree, path, { _hideChildren: !currentVisibility
    });

    let updatedList = treeToFlatList(updatedTree);

    // remove root-node
    if (!showTreeRootNode) {
        updatedList = updatedList.shift();
    }

    state = state.setIn([stateKey, 'data'], updatedList);
    state = state.setIn([stateKey, 'currentRecords'], updatedList);
    state = state.setIn([stateKey, 'treeData'], updatedTree);
    state = state.setIn([stateKey, 'proxy'], updatedList);
    state = state.setIn([stateKey, 'lastUpdate'], generateLastUpdate());

    return state;
};

export const saveRow = (state, { rowIndex, stateKey, values}) => {
    const data = state
        .getIn([stateKey, 'data'])
        .set(rowIndex, fromJS(values));

    return state.mergeIn([stateKey], fromJS({
        data: data,
        proxy: data,
        currentRecords: data,
        lastUpdate: generateLastUpdate()
    }));
};

export const sortData = (state, { data, stateKey }) =>
    state.mergeIn([stateKey], {
        data: data,
        lastUpdate: generateLastUpdate()
    });

export const clearFilter = (state, { stateKey }) => {
    const proxy = state.getIn([stateKey, 'proxy']);
    const prevData = state.getIn([stateKey, 'data']);
    const recs = proxy || prevData;

    return state.mergeIn([stateKey], {
        data: recs,
        proxy: recs,
        currentRecords: recs,
        lastUpdate: generateLastUpdate()
    });
};

export const filterData = (state, { data, stateKey }) =>
    state.mergeIn([stateKey], {
        data: data,
        lastUpdate: generateLastUpdate()
    });
