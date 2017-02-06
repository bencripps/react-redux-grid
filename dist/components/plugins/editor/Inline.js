'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isEditorShown = exports.focusFirstEditor = exports.getEditedRowKey = exports.getInputSelector = exports.getRowFromInput = exports.Inline = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.resetEditorPosition = resetEditorPosition;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _Button = require('./inline/Button');

var _prefix = require('../../../util/prefix');

var _stateGetter = require('../../../util/stateGetter');

var _getEditorTop = require('../../../util/getEditorTop');

var _getRowBoundingRect2 = require('../../../util/getRowBoundingRect');

var _GridConstants = require('../../../constants/GridConstants');

var _EditorActions = require('../../../actions/plugins/editor/EditorActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inline = exports.Inline = function (_Component) {
    _inherits(Inline, _Component);

    _createClass(Inline, [{
        key: 'render',
        value: function render() {
            var _gridConfig = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig.CLASS_NAMES;

            var _props = this.props,
                BUTTON_TYPES = _props.BUTTON_TYPES,
                editorState = _props.editorState,
                events = _props.events,
                stateKey = _props.stateKey,
                store = _props.store;
            var position = this.state.position;

            var editedRowKey = getEditedRowKey(editorState);

            if (!editedRowKey) {
                return null;
            }

            var top = -100;

            if (isEditorShown(editorState)) {
                top = editorState.get(editedRowKey).top;
            }

            var inlineEditorProps = {
                className: (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.CONTAINER, editorState && editorState.get(editedRowKey) ? CLASS_NAMES.EDITOR.INLINE.SHOWN : CLASS_NAMES.EDITOR.INLINE.HIDDEN, position),
                style: {
                    top: top + 'px'
                }
            };

            var buttonContainerProps = {
                className: (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.BUTTON_CONTAINER)
            };

            return _react2.default.createElement(
                'div',
                inlineEditorProps,
                _react2.default.createElement(
                    'span',
                    buttonContainerProps,
                    _react2.default.createElement(_Button.Button, {
                        type: BUTTON_TYPES.CANCEL,
                        editorState: editorState,
                        editedRowKey: editedRowKey,
                        events: events,
                        stateKey: stateKey,
                        store: store
                    }),
                    _react2.default.createElement(_Button.Button, {
                        type: BUTTON_TYPES.SAVE,
                        editorState: editorState,
                        editedRowKey: editedRowKey,
                        events: events,
                        stateKey: stateKey,
                        store: store })
                )
            );
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            /*
            * lifecycle event used to focus on first available input
            * and to reposition editor
            */
            var dom = _reactDom2.default.findDOMNode(this);
            var _props2 = this.props,
                config = _props2.config,
                editorState = _props2.editorState,
                store = _props2.store,
                stateKey = _props2.stateKey;

            var editedRowKey = getEditedRowKey(editorState);
            var position = this.state.position;


            resetEditorPosition.call(this, editorState, store, stateKey, dom, position, editedRowKey);

            if (!config.focusOnEdit) {
                return false;
            }

            if (isEditorShown(editorState) && this.editedRow !== editorState.get(editedRowKey).rowIndex) {

                this.editedRow = editorState.get(editedRowKey).rowIndex;
                focusFirstEditor(dom);
            } else if (!isEditorShown(editorState)) {
                this.editedRow = null;
            }
        }
    }]);

    function Inline(props) {
        _classCallCheck(this, Inline);

        var _this = _possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).call(this, props));

        _this.state = {};
        return _this;
    }

    return Inline;
}(_react.Component);

var getRowFromInput = exports.getRowFromInput = function getRowFromInput(inputEl) {
    var _gridConfig2 = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig2.CLASS_NAMES;

    while (inputEl !== null && inputEl.classList) {
        if (inputEl.classList.contains((0, _prefix.prefix)(CLASS_NAMES.ROW))) {
            return inputEl;
        }

        inputEl = inputEl.parentNode;
    }

    return null;
};

function resetEditorPosition(editorState, store, stateKey, dom, position, rowId) {

    if (!dom) {
        return;
    }

    var input = dom.parentNode.querySelector(getInputSelector());

    if (input) {
        var row = getRowFromInput(input);

        var _getRowBoundingRect = (0, _getRowBoundingRect2.getRowBoundingRect)(row),
            spaceBottom = _getRowBoundingRect.spaceBottom;

        var editedRowKey = getEditedRowKey(editorState);

        var moveToTop = spaceBottom < row.clientHeight * 2;

        if (row && editorState && editorState.get(editedRowKey) && editorState.get(editedRowKey).top) {

            var top = (0, _getEditorTop.getEditorTop)(row, moveToTop, dom);

            if (top !== editorState.get(editedRowKey).top) {
                store.dispatch((0, _EditorActions.repositionEditor)({
                    stateKey: stateKey,
                    top: top,
                    rowId: rowId
                }));
            }

            if (position === 'top' && !moveToTop || moveToTop && !position) {
                this.setState({
                    position: 'bottom'
                });
            } else if (position === 'bottom' && moveToTop || !moveToTop && !position) {
                this.setState({
                    position: 'top'
                });
            }
        }
    }
}

/* eslint-disable max-len */
var getInputSelector = exports.getInputSelector = function getInputSelector() {
    var _gridConfig3 = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig3.CLASS_NAMES;

    return ['.' + (0, _prefix.prefix)(CLASS_NAMES.EDITED_CELL) + ' .' + (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER) + ' input:enabled,', '.' + (0, _prefix.prefix)(CLASS_NAMES.EDITED_CELL) + ' .' + (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER) + ' select:enabled'].join(' ');
};
/* eslint-enable max-len */

var getEditedRowKey = exports.getEditedRowKey = function getEditedRowKey(editorState) {

    if (!editorState) {
        return null;
    }

    var p = editorState.find(function (k) {
        return k !== 'lastUpdate';
    });

    if (!p || !p.get) {
        return null;
    }

    return p.get('key');
};

var focusFirstEditor = exports.focusFirstEditor = function focusFirstEditor(dom) {
    var input = dom.parentNode.querySelector(getInputSelector());

    if (input && input.focus) {
        input.focus();
    }
};

var isEditorShown = exports.isEditorShown = function isEditorShown(editorState) {
    var editedRowKey = getEditedRowKey(editorState);
    return editorState && editorState.get(editedRowKey);
};

Inline.propTypes = {
    BUTTON_TYPES: _react.PropTypes.object,
    columns: _react.PropTypes.array,
    config: _react.PropTypes.object.isRequired,
    editorState: _react.PropTypes.object,
    events: _react.PropTypes.object,
    reducerKeys: _react.PropTypes.object,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object
};

Inline.defaultProps = {
    BUTTON_TYPES: {
        CANCEL: 'CANCEL',
        SAVE: 'SAVE'
    }
};

function mapStateToProps(state, props) {
    return {
        errorHandler: (0, _stateGetter.stateGetter)(state, props, 'errorhandler', props.stateKey),
        editorState: (0, _stateGetter.stateGetter)(state, props, 'editor', props.stateKey)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Inline);