'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filterData = exports.clearFilter = exports.sortData = exports.saveRow = exports.setTreeNodeVisibility = exports.moveNode = exports.addNewRow = exports.updateRow = exports.removeRow = exports.dismissEditor = exports.setPartialTreeData = exports.setData = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _immutable = require('immutable');

var _lastUpdate = require('./../../util/lastUpdate');

var _getTreePathFromId = require('./../../util/getTreePathFromId');

var _moveTreeNode = require('./../../util/moveTreeNode');

var _setTreeValue = require('./../../util/setTreeValue');

var _treeToFlatList = require('./../../util/treeToFlatList');

var _getData = require('./../../util/getData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _arrayFrom2.default)(arr); } }

var setData = exports.setData = function setData(state, _ref) {
    var currentRecords = _ref.currentRecords;
    var data = _ref.data;
    var gridType = _ref.gridType;
    var stateKey = _ref.stateKey;
    var treeData = _ref.treeData;
    var total = _ref.total;


    var keyedData = (0, _getData.setKeysInData)(data);

    return state.setIn([stateKey], (0, _immutable.fromJS)({
        data: keyedData,
        proxy: keyedData,
        total: total || keyedData.count(),
        treeData: treeData,
        gridType: gridType || 'grid',
        currentRecords: currentRecords ? (0, _immutable.List)(currentRecords) : keyedData,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var setPartialTreeData = exports.setPartialTreeData = function setPartialTreeData(state, _ref2) {
    var data = _ref2.data;
    var parentId = _ref2.parentId;
    var showTreeRootNode = _ref2.showTreeRootNode;
    var stateKey = _ref2.stateKey;


    var tree = state.getIn([stateKey, 'treeData']);
    var flat = state.getIn([stateKey, 'data']);
    var pathToNode = [-1].concat(_toConsumableArray((0, _getTreePathFromId.getTreePathFromId)(flat, parentId)));
    var updatedTree = (0, _setTreeValue.setTreeValue)(tree, pathToNode, { children: data });

    var updatedFlat = (0, _treeToFlatList.treeToFlatList)(updatedTree);

    if (!showTreeRootNode) {
        updatedFlat = updatedFlat.shift();
    }

    return state.mergeIn([stateKey], {
        data: updatedFlat,
        currentRecords: updatedFlat,
        treeData: updatedTree,
        proxy: updatedFlat,
        total: updatedFlat.count(),
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });
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

    if (state.get(stateKey)) {
        return state.mergeIn([stateKey], (0, _immutable.fromJS)({
            data: previousProxy,
            proxy: previousProxy,
            currentRecords: previousProxy,
            total: previousTotal,
            isEditing: false,
            lastUpdate: (0, _lastUpdate.generateLastUpdate)()
        }));
    }

    return state;
};

var removeRow = exports.removeRow = function removeRow(state, _ref4) {
    var stateKey = _ref4.stateKey;
    var rowIndex = _ref4.rowIndex;

    var remainingRows = state.getIn([stateKey, 'data']).remove(rowIndex || 0, 1);

    return state.mergeIn([stateKey], (0, _immutable.fromJS)({
        data: remainingRows,
        proxy: remainingRows,
        currentRecords: remainingRows,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var updateRow = exports.updateRow = function updateRow(state, _ref5) {
    var rowIndex = _ref5.rowIndex;
    var stateKey = _ref5.stateKey;
    var values = _ref5.values;


    var data = state.getIn([stateKey, 'data']);
    var row = data ? data.get(rowIndex) : null;

    if (!row) {
        return state;
    }

    var updatedRow = row.merge(values);
    var updatedData = state.getIn([stateKey, 'data']).set(rowIndex, updatedRow);

    return state.mergeIn([stateKey], {
        data: updatedData,
        proxy: updatedData,
        currentRecords: updatedData,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });
};

var addNewRow = exports.addNewRow = function addNewRow(state, _ref6) {
    var rowId = _ref6.rowId;
    var stateKey = _ref6.stateKey;

    var existingState = state.get(stateKey);
    var isEditing = existingState && existingState.get('isEditing');
    var data = existingState && existingState.get('data');

    if (existingState && isEditing) {
        return state;
    }

    var newRow = data && data.size > 0 && data.get(0) ? data.get(0).map(function (k, v) {
        return v = '';
    }) : (0, _immutable.fromJS)({});

    newRow = newRow.set('_key', rowId);

    if (!data) {
        data = new _immutable.List();
    }

    var newData = data.unshift(newRow);

    return state.mergeIn([stateKey], (0, _immutable.fromJS)({
        data: newData,
        proxy: data,
        isEditing: true,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)(),
        total: newData.size
    }));
};

var moveNode = exports.moveNode = function moveNode(state, _ref7) {
    var current = _ref7.current;
    var next = _ref7.next;
    var showTreeRootNode = _ref7.showTreeRootNode;
    var stateKey = _ref7.stateKey;

    var nextPath = (0, _immutable.List)(next.path);
    var tree = state.getIn([stateKey, 'treeData']);
    var currentPath = (0, _immutable.List)(current.path);

    var newTreeMove = (0, _moveTreeNode.moveTreeNode)(tree, current.index, currentPath, next.index, nextPath);

    var flatMove = (0, _treeToFlatList.treeToFlatList)(newTreeMove);

    // remove root-node
    if (!showTreeRootNode) {
        flatMove = flatMove.shift();
    }

    return state.mergeIn([stateKey], {
        data: flatMove,
        currentRecords: flatMove,
        treeData: newTreeMove,
        proxy: flatMove,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });
};

var setTreeNodeVisibility = exports.setTreeNodeVisibility = function setTreeNodeVisibility(state, _ref8) {
    var id = _ref8.id;
    var showTreeRootNode = _ref8.showTreeRootNode;
    var stateKey = _ref8.stateKey;


    var flat = state.getIn([stateKey, 'data']);
    var tree = state.getIn([stateKey, 'treeData']);

    var currentVisibility = !!flat.find(function (node) {
        return node.get('_id') === id;
    }).get('_hideChildren');

    var path = [-1].concat(_toConsumableArray((0, _getTreePathFromId.getTreePathFromId)(flat, id)));

    var updatedTree = (0, _setTreeValue.setTreeValue)(tree, path, { _hideChildren: !currentVisibility
    });

    var updatedList = (0, _treeToFlatList.treeToFlatList)(updatedTree);

    // remove root-node
    if (!showTreeRootNode) {
        updatedList = updatedList.shift();
    }

    state = state.setIn([stateKey, 'data'], updatedList);
    state = state.setIn([stateKey, 'currentRecords'], updatedList);
    state = state.setIn([stateKey, 'treeData'], updatedTree);
    state = state.setIn([stateKey, 'proxy'], updatedList);
    state = state.setIn([stateKey, 'lastUpdate'], (0, _lastUpdate.generateLastUpdate)());

    return state;
};

var saveRow = exports.saveRow = function saveRow(state, _ref9) {
    var rowIndex = _ref9.rowIndex;
    var stateKey = _ref9.stateKey;
    var values = _ref9.values;

    var data = state.getIn([stateKey, 'data']).set(rowIndex, (0, _immutable.fromJS)(values));

    return state.mergeIn([stateKey], (0, _immutable.fromJS)({
        data: data,
        proxy: data,
        currentRecords: data,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var sortData = exports.sortData = function sortData(state, _ref10) {
    var data = _ref10.data;
    var stateKey = _ref10.stateKey;
    return state.mergeIn([stateKey], {
        data: data,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });
};

var clearFilter = exports.clearFilter = function clearFilter(state, _ref11) {
    var stateKey = _ref11.stateKey;

    var proxy = state.getIn([stateKey, 'proxy']);
    var prevData = state.getIn([stateKey, 'data']);
    var recs = proxy || prevData;

    return state.mergeIn([stateKey], {
        data: recs,
        proxy: recs,
        currentRecords: recs,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });
};

var filterData = exports.filterData = function filterData(state, _ref12) {
    var data = _ref12.data;
    var stateKey = _ref12.stateKey;
    return state.mergeIn([stateKey], {
        data: data,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    });
};