'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.equalProps = exports.slimColumn = undefined;
exports.shouldGridUpdate = shouldGridUpdate;
exports.shouldPagerUpdate = shouldPagerUpdate;
exports.shouldHeaderUpdate = shouldHeaderUpdate;
exports.shouldRowUpdate = shouldRowUpdate;

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _lastUpdate = require('./lastUpdate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shouldGridUpdate(nextProps) {
    var result = true;

    var _props = this.props,
        reducerKeys = _props.reducerKeys,
        stateKey = _props.stateKey,
        store = _props.store;


    var nextUpdate = (0, _lastUpdate.getLastUpdate)(store, stateKey, reducerKeys);

    result = !(0, _deepEqual2.default)(nextUpdate, this._lastUpdate) || !equalProps(nextProps, this._lastProps);

    this._lastUpdate = nextUpdate;
    this._lastProps = nextProps;

    return result;
}

function shouldPagerUpdate(nextProps, nextState) {

    var result = true;

    var limitedNextProps = {
        gridData: nextProps.gridData,
        state: this.state
    };

    var limitedProps = {
        gridData: this.props.gridData,
        state: nextState
    };

    result = !(0, _deepEqual2.default)(limitedNextProps, limitedProps);

    return result;
}

function shouldHeaderUpdate(nextProps, nextState) {
    var result = true;

    var menuState = function menuState(state) {
        return state && state['header-row'];
    };

    var limitedNextProps = {
        columns: nextProps.columns,
        menuState: menuState(nextProps.menuState),
        state: nextState
    };

    var limitedProps = {
        columns: this.previousColumns,
        menuState: menuState(this.props.menuState),
        state: this.state
    };

    result = !(0, _deepEqual2.default)(limitedNextProps, limitedProps);

    this.previousColumns = this.props.columns.slice();

    return result;
}

function shouldRowUpdate(nextProps) {
    var result = true;

    // unique key created by setData action/reducer
    var key = nextProps.row._key;

    var isSelected = function isSelected(rows) {
        return Boolean(rows && rows[key]);
    };

    var isMenuShown = function isMenuShown(rows) {
        return Boolean(rows && rows[key]);
    };

    var isEdited = function isEdited(editorState) {
        return Boolean(editorState && editorState[key] && editorState[key].values);
    };

    var limitedNextProps = {
        columns: slimColumn(nextProps.columns),
        isEdited: isEdited(nextProps.editorState),
        currentValues: isEdited(nextProps.editorState) ? nextProps.editorState[key] : null,
        isMenuShown: isMenuShown(nextProps.menuState),
        row: nextProps.row,
        index: nextProps.index,
        isSelected: isSelected(nextProps.selectedRows),
        isDragging: nextProps.isDragging
    };

    var limitedProps = {
        columns: this.previousColumns,
        isEdited: isEdited(this.props.editorState),
        currentValues: isEdited(this.props.editorState) ? this.props.editorState[key] : null,
        isMenuShown: isMenuShown(this.props.menuState),
        row: this.props.row,
        index: this.props.index,
        isSelected: isSelected(this.props.selectedRows),
        isDragging: this.props.isDragging
    };

    this.previousColumns = slimColumn(this.props.columns.slice());

    result = !(0, _deepEqual2.default)(limitedNextProps, limitedProps);

    return result;
}

var slimColumn = exports.slimColumn = function slimColumn(cols) {
    return cols.map(function (col) {
        return { hidden: col.hidden, dataIndex: col.dataIndex };
    });
};

var equalProps = exports.equalProps = function equalProps() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var newProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return props.height === newProps.height && (0, _deepEqual2.default)(props.classNames, newProps.classNames) && (0, _deepEqual2.default)(props.events, newProps.events);
};