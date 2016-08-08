'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.equalProps = undefined;
exports.shouldGridUpdate = shouldGridUpdate;
exports.shouldRowUpdate = shouldRowUpdate;

var _immutable = require('immutable');

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _keyGenerator = require('./keyGenerator');

var _lastUpdate = require('./lastUpdate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shouldGridUpdate(nextProps) {
    var result = true;

    var _props = this.props;
    var reducerKeys = _props.reducerKeys;
    var stateKey = _props.stateKey;
    var store = _props.store;


    var nextUpdate = (0, _lastUpdate.getLastUpdate)(store, stateKey, reducerKeys);

    result = !(0, _deepEqual2.default)(nextUpdate, this._lastUpdate) || !equalProps(nextProps, this._lastProps);

    this._lastUpdate = nextUpdate;
    this._lastProps = nextProps;

    return result;
}

function shouldRowUpdate(nextProps) {
    var result = true;
    var _nextProps = nextProps;
    var columns = _nextProps.columns;
    var editorState = _nextProps.editorState;
    var menuState = _nextProps.menuState;
    var row = _nextProps.row;
    var index = _nextProps.index;
    var selectedRows = _nextProps.selectedRows;

    // create id for row a single time

    this.id = this.id || (0, _keyGenerator.keyGenerator)('row', index);

    // update if selection change
    var isSelected = Boolean(selectedRows && selectedRows[this.id]);

    // update if menu is shown or hidden
    var isMenuShown = Boolean(menuState && menuState[this.id]);

    // update if editor state changes for only this row
    var isEdited = Boolean(editorState && editorState.row && editorState.row.rowIndex === index);

    // if row is currently being edited, cache the last value
    if (isEdited) {
        this._previousEditorState = editorState;
    }

    nextProps = (0, _immutable.fromJS)({
        columns: columns,
        isSelected: isSelected,
        isMenuShown: isMenuShown,
        index: index,
        row: row,
        isEdited: isEdited,
        rowValuesUpdated: this._previousEditorState
    });

    // if this is the first pass, no previous values have been
    // cached, thusly just return true and create _lastProps
    if (!this._lastProps) {
        this._lastProps = nextProps;
        return true;
    }

    result = !(0, _immutable.is)(nextProps, this._lastProps);

    this._lastProps = nextProps;

    return result;
}

var equalProps = exports.equalProps = function equalProps() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var newProps = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return props.height === newProps.height && (0, _deepEqual2.default)(props.classNames, newProps.classNames) && (0, _deepEqual2.default)(props.events, newProps.events);
};