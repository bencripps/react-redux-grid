'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

exports.default = dataSource;

var _immutable = require('immutable');

var _ActionTypes = require('../../constants/ActionTypes');

var _lastUpdate = require('./../../util/lastUpdate');

var _getTreePathFromId = require('./../../util/getTreePathFromId');

var _moveTreeNode = require('./../../util/moveTreeNode');

var _setTreeValue = require('./../../util/setTreeValue');

var _treeToFlatList = require('./../../util/treeToFlatList');

var _getData = require('./../../util/getData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _arrayFrom2.default)(arr); } }

var initialState = (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() });

function dataSource() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {

        case _ActionTypes.SET_DATA:

            var dataWithKeys = (0, _getData.setKeysInData)(action.data);

            return state.setIn([action.stateKey], (0, _immutable.fromJS)({
                data: dataWithKeys,
                proxy: dataWithKeys,
                total: action.total || dataWithKeys.count(),
                treeData: action.treeData,
                gridType: action.gridType || 'grid',
                currentRecords: action.currentRecords ? (0, _immutable.List)(action.currentRecords) : dataWithKeys,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.SET_TREE_DATA_PARTIAL:
            var treeVals = state.getIn([action.stateKey, 'treeData']);
            var flattened = state.getIn([action.stateKey, 'data']);
            var pathToNode = [-1].concat(_toConsumableArray((0, _getTreePathFromId.getTreePathFromId)(flattened, action.parentId)));
            var newTreeValues = (0, _setTreeValue.setTreeValue)(treeVals, pathToNode, { children: action.data });

            var newFlatList = (0, _treeToFlatList.treeToFlatList)(newTreeValues);

            if (!action.showTreeRootNode) {
                newFlatList = newFlatList.shift();
            }

            return state.mergeIn([action.stateKey], {
                data: newFlatList,
                currentRecords: newFlatList,
                treeData: newTreeValues,
                proxy: newFlatList,
                total: newFlatList.count(),
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        case _ActionTypes.DISMISS_EDITOR:
            var previousData = state.getIn([action.stateKey, 'data']);
            var previousProxy = state.getIn([action.stateKey, 'proxy']);
            var previousTotal = state.getIn([action.stateKey, 'total']);

            // upon dismiss, if a new row was in edit
            // but isn't save, update the total to reflect that
            if (previousData && previousProxy && previousData.size > previousProxy.size) {
                previousTotal = previousProxy.size;
            }

            if (state.get(action.stateKey)) {
                return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                    data: previousProxy,
                    proxy: previousProxy,
                    currentRecords: previousProxy,
                    total: previousTotal,
                    isEditing: false,
                    lastUpdate: (0, _lastUpdate.generateLastUpdate)()
                }));
            }

            return state;

        case _ActionTypes.REMOVE_ROW:
            var remainingRows = state.getIn([action.stateKey, 'data']).remove(action.rowIndex || 0, 1);

            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                data: remainingRows,
                proxy: remainingRows,
                currentRecords: remainingRows,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.UPDATE_ROW:

            var existingData = state.getIn([action.stateKey, 'data']);
            var prevRow = existingData ? existingData.get(action.rowIndex) : null;

            if (!prevRow) {
                return state;
            }

            var updatedRow = prevRow.merge(action.values);
            var updatedData = state.getIn([action.stateKey, 'data']).set(action.rowIndex, updatedRow);

            return state.mergeIn([action.stateKey], {
                data: updatedData,
                proxy: updatedData,
                currentRecords: updatedData,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        case _ActionTypes.ADD_NEW_ROW:

            var existingState = state.get(action.stateKey);
            var isEditing = existingState && existingState.get('isEditing');
            var data = existingState && existingState.get('data');

            if (existingState && isEditing) {
                return state;
            }

            var newRow = data && data.size > 0 && data.get(0) ? data.get(0).map(function (k, v) {
                return v = '';
            }) : (0, _immutable.fromJS)({});

            newRow = newRow.set('_key', action.rowId);

            if (!data) {
                data = new _immutable.List();
            }

            var newData = data.unshift(newRow);

            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                data: newData,
                proxy: data,
                isEditing: true,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)(),
                total: newData.size
            }));

        case _ActionTypes.MOVE_NODE:
            var current = action.current;
            var next = action.next;


            var nextPath = (0, _immutable.List)(next.path);

            var treeMove = state.getIn([action.stateKey, 'treeData']);

            var currentPath = (0, _immutable.List)(current.path);

            var newTreeMove = (0, _moveTreeNode.moveTreeNode)(treeMove, current.index, currentPath, next.index, nextPath);

            var flatMove = (0, _treeToFlatList.treeToFlatList)(newTreeMove);

            // remove root-node
            if (!action.showTreeRootNode) {
                flatMove = flatMove.shift();
            }

            return state.mergeIn([action.stateKey], {
                data: flatMove,
                currentRecords: flatMove,
                treeData: newTreeMove,
                proxy: flatMove,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        case _ActionTypes.SET_TREE_NODE_VISIBILITY:

            var treeFlatList = state.getIn([action.stateKey, 'data']);
            var tree = state.getIn([action.stateKey, 'treeData']);

            var currentVisibility = !!treeFlatList.find(function (node) {
                return node.get('_id') === action.id;
            }).get('_hideChildren');

            var path = [-1].concat(_toConsumableArray((0, _getTreePathFromId.getTreePathFromId)(treeFlatList, action.id)));

            var newTree = (0, _setTreeValue.setTreeValue)(tree, path, { _hideChildren: !currentVisibility
            });

            var flattenedTree = (0, _treeToFlatList.treeToFlatList)(newTree);

            // remove root-node
            if (!action.showTreeRootNode) {
                flattenedTree = flattenedTree.shift();
            }

            state = state.setIn([action.stateKey, 'data'], flattenedTree);
            state = state.setIn([action.stateKey, 'currentRecords'], flattenedTree);
            state = state.setIn([action.stateKey, 'treeData'], newTree);
            state = state.setIn([action.stateKey, 'proxy'], flattenedTree);
            state = state.setIn([action.stateKey, 'lastUpdate'], (0, _lastUpdate.generateLastUpdate)());

            return state;

        case _ActionTypes.SAVE_ROW:
            var gridData = state.getIn([action.stateKey, 'data']).set(action.rowIndex, (0, _immutable.fromJS)(action.values));

            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                data: gridData,
                proxy: gridData,
                currentRecords: gridData,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.SORT_DATA:
            return state.mergeIn([action.stateKey], {
                data: action.data,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        case _ActionTypes.CLEAR_FILTER_LOCAL:

            var proxy = state.getIn([action.stateKey, 'proxy']);
            var prevData = state.getIn([action.stateKey, 'data']);
            var recs = proxy || prevData;

            return state.mergeIn([action.stateKey], {
                data: recs,
                proxy: recs,
                currentRecords: recs,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        case _ActionTypes.FILTER_DATA:
            return state.mergeIn([action.stateKey], {
                data: action.data,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        default:

            return state;
    }
}