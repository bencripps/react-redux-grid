'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handleActions;

var _immutable = require('immutable');

var _ActionTypes = require('../../constants/ActionTypes');

var _handleActions2 = require('./../../util/handleActions');

var _handleActions3 = _interopRequireDefault(_handleActions2);

var _datasource = require('./../actionHelpers/datasource');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = new _immutable.OrderedMap();

exports.default = (0, _handleActions3.default)((_handleActions = {}, _defineProperty(_handleActions, _ActionTypes.ADD_NEW_ROW, _datasource.addNewRow), _defineProperty(_handleActions, _ActionTypes.CLEAR_FILTER_LOCAL, _datasource.clearFilter), _defineProperty(_handleActions, _ActionTypes.DISMISS_EDITOR, _datasource.dismissEditor), _defineProperty(_handleActions, _ActionTypes.FILTER_DATA, _datasource.filterData), _defineProperty(_handleActions, _ActionTypes.MOVE_NODE, _datasource.moveNode), _defineProperty(_handleActions, _ActionTypes.REMOVE_ROW, _datasource.removeRow), _defineProperty(_handleActions, _ActionTypes.SAVE_ROW, _datasource.saveRow), _defineProperty(_handleActions, _ActionTypes.SET_DATA, _datasource.setData), _defineProperty(_handleActions, _ActionTypes.SET_TREE_NODE_VISIBILITY, _datasource.setTreeNodeVisibility), _defineProperty(_handleActions, _ActionTypes.SET_TREE_DATA_PARTIAL, _datasource.setPartialTreeData), _defineProperty(_handleActions, _ActionTypes.SORT_DATA, _datasource.sortData), _defineProperty(_handleActions, _ActionTypes.UPDATE_ROW, _datasource.updateRow), _handleActions), initialState);