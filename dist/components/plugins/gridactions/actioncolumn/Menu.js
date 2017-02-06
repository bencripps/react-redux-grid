'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEditAction = exports.Menu = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('./../../../core/menu/Menu');

var _handleEditClick = require('./../../../../util/handleEditClick');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = exports.Menu = function Menu(_ref) {
    var actions = _ref.actions,
        columns = _ref.columns,
        editor = _ref.editor,
        maxHeight = _ref.maxHeight,
        reducerKeys = _ref.reducerKeys,
        rowData = _ref.rowData,
        rowId = _ref.rowId,
        rowIndex = _ref.rowIndex,
        stateKey = _ref.stateKey,
        store = _ref.store,
        type = _ref.type;


    if (editor.config.enabled && type !== 'header') {
        actions.menu.unshift(getEditAction(editor, store, rowId, rowData, rowIndex, columns, stateKey));
    }

    var menuProps = Object.assign({}, actions, {
        metaData: {
            rowId: rowId,
            rowData: rowData && rowData.toJS ? rowData.toJS() : rowData,
            rowIndex: rowIndex
        },
        maxHeight: maxHeight,
        reducerKeys: reducerKeys,
        stateKey: stateKey,
        store: store
    });

    return _react2.default.createElement(_Menu.ConnectedMenu, menuProps);
};

var getEditAction = exports.getEditAction = function getEditAction(editor, store, rowId, rowData, rowIndex, columns, stateKey) {
    return {
        text: 'Edit',
        EVENT_HANDLER: _handleEditClick.handleEditClick.bind(undefined, editor, store, rowId, rowData, rowIndex, columns, stateKey, {}),
        key: 'grid-edit-action'
    };
};

Menu.propTypes = {
    actions: _react.PropTypes.object,
    columns: _react.PropTypes.arrayOf(_react.PropTypes.object),
    editor: _react.PropTypes.object,
    maxHeight: _react.PropTypes.number,
    reducerKeys: _react.PropTypes.object,
    rowData: _react.PropTypes.object,
    rowId: _react.PropTypes.string,
    rowIndex: _react.PropTypes.number,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object,
    type: _react.PropTypes.string
};

Menu.defaultProps = {};