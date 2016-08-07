'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEditAction = exports.Menu = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('./../../../core/menu/Menu');

var _handleEditClick = require('./../../../../util/handleEditClick');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = exports.Menu = function Menu(_ref) {
    var actions = _ref.actions;
    var columns = _ref.columns;
    var type = _ref.type;
    var store = _ref.store;
    var editor = _ref.editor;
    var reducerKeys = _ref.reducerKeys;
    var rowId = _ref.rowId;
    var rowData = _ref.rowData;
    var rowIndex = _ref.rowIndex;
    var stateKey = _ref.stateKey;


    if (editor.config.enabled && type !== 'header') {
        actions.menu.unshift(getEditAction(editor, store, rowId, rowData, rowIndex, columns, stateKey));
    }

    var menuProps = _extends({}, actions, {
        metaData: {
            rowId: rowId,
            rowData: rowData,
            rowIndex: rowIndex
        },
        reducerKeys: reducerKeys,
        stateKey: stateKey,
        store: store
    });

    return _react2.default.createElement(_Menu.ConnectedMenu, menuProps);
};

var getEditAction = exports.getEditAction = function getEditAction(editor, store, rowId, rowData, rowIndex, columns, stateKey) {
    return {
        text: 'Edit',
        EVENT_HANDLER: _handleEditClick.handleEditClick.bind(undefined, editor, store, rowId, rowData, rowIndex, columns, stateKey),
        key: 'grid-edit-action'
    };
};

Menu.propTypes = {
    actions: _react.PropTypes.object,
    columns: _react.PropTypes.arrayOf(_react.PropTypes.object),
    editor: _react.PropTypes.object,
    reducerKeys: _react.PropTypes.object,
    rowData: _react.PropTypes.object,
    rowId: _react.PropTypes.string,
    rowIndex: _react.PropTypes.number,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object,
    type: _react.PropTypes.string
};

Menu.defaultProps = {};