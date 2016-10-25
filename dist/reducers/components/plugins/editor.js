'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handleActions;

var _immutable = require('immutable');

var _ActionTypes = require('../../../constants/ActionTypes');

var _handleActions2 = require('./../../../util/handleActions');

var _handleActions3 = _interopRequireDefault(_handleActions2);

var _editor = require('./../../actionHelpers/plugins/editor');

var _lastUpdate = require('./../../../util/lastUpdate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.fromJS)({
    lastUpdate: (0, _lastUpdate.generateLastUpdate)()
});

exports.default = (0, _handleActions3.default)((_handleActions = {}, _defineProperty(_handleActions, _ActionTypes.EDIT_ROW, _editor.editRow), _defineProperty(_handleActions, _ActionTypes.DISMISS_EDITOR, _editor.removeEditorState), _defineProperty(_handleActions, _ActionTypes.CANCEL_ROW, _editor.removeEditorState), _defineProperty(_handleActions, _ActionTypes.REMOVE_ROW, _editor.removeEditorState), _defineProperty(_handleActions, _ActionTypes.SET_DATA, _editor.setData), _defineProperty(_handleActions, _ActionTypes.REPOSITION_EDITOR, _editor.repositionEditor), _defineProperty(_handleActions, _ActionTypes.ROW_VALUE_CHANGE, _editor.rowValueChange), _handleActions), initialState);