'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onButtonClick = exports.Button = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('./../../../../util/prefix');

var _GridConstants = require('./../../../../constants/GridConstants');

var _EditorActions = require('./../../../../actions/plugins/editor/EditorActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = exports.Button = function Button(_ref) {
    var BUTTON_TYPES = _ref.BUTTON_TYPES,
        saveText = _ref.saveText,
        cancelText = _ref.cancelText,
        editorState = _ref.editorState,
        editedRowKey = _ref.editedRowKey,
        events = _ref.events,
        stateKey = _ref.stateKey,
        store = _ref.store,
        type = _ref.type;


    var text = type === BUTTON_TYPES.SAVE ? saveText : cancelText;

    var buttonProps = {
        onClick: onButtonClick.bind(null, BUTTON_TYPES, editorState, events, type, stateKey, editedRowKey, store),
        className: type === BUTTON_TYPES.SAVE ? (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.EDITOR.INLINE.SAVE_BUTTON) : (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.EDITOR.INLINE.CANCEL_BUTTON)
    };

    if (type === BUTTON_TYPES.SAVE && editorState && editorState[editedRowKey] && !editorState[editedRowKey].valid) {
        buttonProps.disabled = true;
    }

    return _react2.default.createElement(
        'button',
        buttonProps,
        text
    );
};

Button.propTypes = {
    BUTTON_TYPES: _react.PropTypes.object,
    cancelText: _react.PropTypes.string,
    editedRowKey: _react.PropTypes.string,
    editorState: _react.PropTypes.object,
    events: _react.PropTypes.object,
    saveText: _react.PropTypes.string,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object,
    type: _react.PropTypes.string
};

Button.defaultProps = {
    BUTTON_TYPES: {
        CANCEL: 'CANCEL',
        SAVE: 'SAVE'
    },
    cancelText: 'Cancel',
    editorState: {},
    saveText: 'Save'
};

var onButtonClick = exports.onButtonClick = function onButtonClick(BUTTON_TYPES, editorState, events, type, stateKey, editedRowKey, store) {

    var values = _extends({}, editorState[editedRowKey].values, { _key: editedRowKey });

    if (type === BUTTON_TYPES.SAVE && events.HANDLE_BEFORE_INLINE_EDITOR_SAVE) {

        var result = events.HANDLE_BEFORE_INLINE_EDITOR_SAVE({
            values: values, editorState: editorState
        });

        // early exit if custom event returns false
        // dont do save or dismiss editor
        if (result === false) {
            return;
        }
    }

    if (type === BUTTON_TYPES.CANCEL) {
        store.dispatch((0, _EditorActions.dismissEditor)({ stateKey: stateKey }));
    } else if (type === BUTTON_TYPES.SAVE) {

        store.dispatch((0, _EditorActions.saveRow)({
            values: values,
            rowIndex: editorState[editedRowKey].rowIndex,
            stateKey: stateKey
        }));

        if (events.HANDLE_AFTER_INLINE_EDITOR_SAVE) {
            events.HANDLE_AFTER_INLINE_EDITOR_SAVE({
                values: values, editorState: editorState
            });
        }

        store.dispatch((0, _EditorActions.dismissEditor)({ stateKey: stateKey }));
    }
};