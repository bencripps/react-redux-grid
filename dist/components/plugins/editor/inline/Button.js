'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onButtonClick = exports.Button = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('./../../../../util/prefix');

var _fire = require('./../../../../util/fire');

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

    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    var text = type === BUTTON_TYPES.SAVE ? saveText : cancelText;

    var buttonProps = {
        onClick: onButtonClick.bind(null, BUTTON_TYPES, editorState, events, type, stateKey, editedRowKey, store),
        className: type === BUTTON_TYPES.SAVE ? (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.SAVE_BUTTON) : (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.CANCEL_BUTTON)
    };

    if (type === BUTTON_TYPES.SAVE && editorState && editorState.get(editedRowKey) && !editorState.get(editedRowKey).valid) {
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

    var values = editorState.get(editedRowKey).values;

    if (!values._key) {
        values = values.set('_key', editedRowKey);
    }

    if (type === BUTTON_TYPES.SAVE) {

        var result = (0, _fire.fireEvent)('HANDLE_BEFORE_INLINE_EDITOR_SAVE', events, {
            values: values,
            editor: editorState
        }, null);

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
            rowIndex: editorState.get(editedRowKey).rowIndex,
            stateKey: stateKey
        }));

        (0, _fire.fireEvent)('HANDLE_AFTER_INLINE_EDITOR_SAVE', events, {
            values: values,
            editor: editorState
        }, null);

        store.dispatch((0, _EditorActions.dismissEditor)({ stateKey: stateKey }));
    }
};