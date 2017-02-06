'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filterData = exports.clearFilter = exports.sortData = exports.saveRow = exports.setTreeNodeVisibility = exports.moveNode = exports.addNewRow = exports.updateRow = exports.removeRow = exports.dismissEditor = exports.setPartialTreeData = exports.setData = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _immutable = require('immutable');

var _lastUpdate = require('./../../util/lastUpdate');

var _records = require('./../../records');

var _getTreePathFromId = require('./../../util/getTreePathFromId');

var _moveTreeNode = require('./../../util/moveTreeNode');

var _setTreeValue = require('./../../util/setTreeValue');

var _treeToFlatList = require('./../../util/treeToFlatList');

var _getData = require('./../../util/getData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _arrayFrom2.default)(arr); } }

var setData = exports.setData = function setData(state, _ref) {
    var currentRecords = _ref.currentRecords,
        data = _ref.data,
        gridType = _ref.gridType,
        stateKey = _ref.stateKey,
        treeData = _ref.treeData,
        total = _ref.total;


    var keyedData = (0, _getData.setKeysInData)(data);
    var keyedCurr = void 0;

    if (currentRecords) {
        keyedCurr = (0, _getData.setKeysInData)(currentRecords);
    }

    return state.setIn([stateKey], new _records.DataSource({
        data: keyedData,
        proxy: keyedData,
        total: total || keyedData.count(),
        treeData: (0, _immutable.fromJS)(treeData),
        gridType: gridType || 'grid',
        currentRecords: keyedCurr ? keyedCurr : keyedData,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var setPartialTreeData = exports.setPartialTreeData = function setPartialTreeData(state, _ref2) {
    var data = _ref2.data,
        parentId = _ref2.parentId,
        showTreeRootNode = _ref2.showTreeRootNode,
        stateKey = _ref2.stateKey;


    var tree = state.getIn([stateKey, 'treeData']);
    var flat = state.getIn([stateKey, 'data']);
    var pathToNode = [-1].concat(_toConsumableArray((0, _getTreePathFromId.getTreePathFromId)(flat, parentId)));
    var updatedTree = (0, _setTreeValue.setTreeValue)(tree, pathToNode, { children: data });

    var updatedFlat = (0, _treeToFlatList.treeToFlatList)(updatedTree);

    if (!showTreeRootNode) {
        updatedFlat = updatedFlat.shift();
    }

    var record = state.get(stateKey).merge({
        data: updatedFlat,
        currentRecords: updatedFlat,
        treeData: updatedTree,
        proxy: updatedFlat,
        total: updatedFlat.count(),
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });

    return state.setIn([stateKey], record);
};

var dismissEditor = exports.dismissEditor = function dismissEditor(state, _ref3) {
    var stateKey = _ref3.stateKey;

    var previousData = state.getIn([stateKey, 'data']);
    var previousProxy = state.getIn([stateKey, 'proxy']);
    var previousTotal = state.getIn([stateKey, 'total']);

    // upon dismiss, if a new row was in edit
    // but isn't save, update the total to reflect that
    if (previousData && previousProxy && previousData.size > previousProxy.size) {
        previousTotal = previousProxy.size;
    }

    var record = state.get(stateKey);

    if (record) {
        var updated = record.merge({
            data: previousProxy,
            proxy: previousProxy,
            currentRecords: previousProxy,
            total: previousTotal,
            isEditing: false,
            lastUpdate: (0, _lastUpdate.generateLastUpdate)()
        });

        return state.setIn([stateKey], updated);
    }

    return state;
};

var removeRow = exports.removeRow = function removeRow(state, _ref4) {
    var stateKey = _ref4.stateKey,
        rowIndex = _ref4.rowIndex;

    var remainingRows = state.getIn([stateKey, 'data']).remove(rowIndex || 0, 1);

    var record = state.get(stateKey);

    var updated = record.merge({
        data: remainingRows,
        proxy: remainingRows,
        currentRecords: remainingRows,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });

    return state.setIn([stateKey], updated);
};

var updateRow = exports.updateRow = function updateRow(state, _ref5) {
    var rowIndex = _ref5.rowIndex,
        stateKey = _ref5.stateKey,
        values = _ref5.values;


    var data = state.getIn([stateKey, 'data']);
    var row = data ? data.get(rowIndex) : null;

    if (!row) {
        return state;
    }

    var updatedRow = row.merge(values);
    var updatedData = state.getIn([stateKey, 'data']).set(rowIndex, updatedRow);

    var record = state.get(stateKey);

    var updated = record.merge({
        data: updatedData,
        proxy: updatedData,
        currentRecords: updatedData,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });

    return state.setIn([stateKey], updated);
};

var addNewRow = exports.addNewRow = function addNewRow(state, _ref6) {
    var rowId = _ref6.rowId,
        stateKey = _ref6.stateKey;

    var existingState = state.get(stateKey);
    var isEditing = existingState && existingState.get('isEditing');
    var data = existingState && existingState.get('data');

    if (existingState && isEditing) {
        return state;
    }

    var newRow = data && data.size > 0 && data.get(0) ? data.get(0).map(function (k, v) {
        v = '';return v;
    }) : (0, _immutable.fromJS)({});

    newRow = newRow.set('_key', rowId);

    if (!data) {
        data = new _immutable.List();
    }

    var newData = data.unshift(newRow);
    var updated = existingState.merge({
        data: newData,
        proxy: data,
        isEditing: true,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)(),
        total: newData.size
    });

    return state.setIn([stateKey], updated);
};

var moveNode = exports.moveNode = function moveNode(state, _ref7) {
    var current = _ref7.current,
        next = _ref7.next,
        showTreeRootNode = _ref7.showTreeRootNode,
        stateKey = _ref7.stateKey;

    var nextPath = (0, _immutable.List)(next.path);
    var tree = state.getIn([stateKey, 'treeData']);
    var currentPath = (0, _immutable.List)(current.path);

    var newTreeMove = (0, _moveTreeNode.moveTreeNode)(tree, current.index, currentPath, next.index, nextPath);

    var flatMove = (0, _treeToFlatList.treeToFlatList)(newTreeMove);

    // remove root-node
    if (!showTreeRootNode) {
        flatMove = flatMove.shift();
    }

    var record = state.get(stateKey);
    var updated = record.merge({
        data: flatMove,
        currentRecords: flatMove,
        treeData: newTreeMove,
        proxy: flatMove,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });

    return state.setIn([stateKey], updated);
};

var setTreeNodeVisibility = exports.setTreeNodeVisibility = function setTreeNodeVisibility(state, _ref8) {
    var id = _ref8.id,
        showTreeRootNode = _ref8.showTreeRootNode,
        stateKey = _ref8.stateKey;


    var flat = state.getIn([stateKey, 'data']);
    var tree = state.getIn([stateKey, 'treeData']);

    var currentVisibility = !!flat.find(function (node) {
        return node.get('_id') === id;
    }).get('_hideChildren');

    var path = [-1].concat(_toConsumableArray((0, _getTreePathFromId.getTreePathFromId)(flat, id)));

    var updatedTree = (0, _setTreeValue.setTreeValue)(tree, path, { _hideChildren: !currentVisibility });

    var updatedList = (0, _treeToFlatList.treeToFlatList)(updatedTree);

    // remove root-node
    if (!showTreeRootNode) {
        updatedList = updatedList.shift();
    }

    var record = state.get(stateKey);
    var updated = record.merge({
        data: updatedList,
        currentRecords: updatedList,
        treeData: updatedTree,
        proxy: updatedList,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });

    return state.setIn([stateKey], updated);
};

var saveRow = exports.saveRow = function saveRow(state, _ref9) {
    var rowIndex = _ref9.rowIndex,
        stateKey = _ref9.stateKey,
        values = _ref9.values;

    var data = state.getIn([stateKey, 'data']).set(rowIndex, (0, _immutable.fromJS)(values));

    var record = state.get(stateKey);
    var updated = record.merge({
        data: data,
        proxy: data,
        currentRecords: data,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });

    return state.setIn([stateKey], updated);
};

var sortData = exports.sortData = function sortData(state, _ref10) {
    var data = _ref10.data,
        stateKey = _ref10.stateKey;


    var record = state.get(stateKey);
    var updated = record.merge({
        data: data,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });

    return state.setIn([stateKey], updated);
};

var clearFilter = exports.clearFilter = function clearFilter(state, _ref11) {
    var stateKey = _ref11.stateKey;

    var proxy = state.getIn([stateKey, 'proxy']);
    var prevData = state.getIn([stateKey, 'data']);
    var recs = proxy || prevData;

    var record = state.get(stateKey);
    var updated = record.merge({
        data: recs,
        proxy: recs,
        currentRecords: recs,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });

    return state.setIn([stateKey], updated);
};

var filterData = exports.filterData = function filterData(state, _ref12) {
    var data = _ref12.data,
        stateKey = _ref12.stateKey;

    var record = state.get(stateKey);
    var updated = record.merge({
        data: data,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });

    return state.setIn([stateKey], updated);
};