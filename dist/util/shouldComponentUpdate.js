'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.equalProps = exports.slimColumn = exports.isEdited = exports.isMenuShown = exports.isSelected = undefined;
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
        stateKey = _props.stateKey;

    var store = this.context.store || this.props.store;

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

function shouldHeaderUpdate() {
    // let result = true;
    // to do, stop this
    return true;

    /* eslint-disable no-unreachable */

    // const menuState = state =>
    //     state && state.get('header-row');

    // const limitedNextProps = {
    //     columns: nextProps.columns,
    //     menuState: menuState(nextProps.menuState),
    //     state: nextState
    // };

    // const limitedProps = {
    //     columns: this.previousColumns,
    //     menuState: menuState(this.props.menuState),
    //     state: this.state
    // };

    // result = (
    //     !deepEqual(limitedNextProps, limitedProps)
    // );

    // this.previousColumns = this.props.columns.slice();

    // return result;

    /* eslint-enable no-unreachable */
}

function shouldRowUpdate(nextProps) {
    var result = true;

    // unique key created by setData action/reducer
    var key = nextProps.row.get('_key');

    var limitedNextProps = {
        columns: slimColumn(nextProps.columns),
        isEdited: isEdited(nextProps.editorState, key),
        currentValues: isEdited(nextProps.editorState, key) ? nextProps.editorState.get(key) : null,
        isMenuShown: isMenuShown(nextProps.menuState, key),
        row: nextProps.row,
        index: nextProps.index,
        isSelected: isSelected(nextProps.selectedRows, key),
        isDragging: nextProps.isDragging
    };

    var limitedProps = {
        columns: this.previousColumns,
        isEdited: isEdited(this.props.editorState, key),
        currentValues: isEdited(this.props.editorState, key) ? this.props.editorState.get(key) : null,
        isMenuShown: isMenuShown(this.props.menuState, key),
        row: this.props.row,
        index: this.props.index,
        isSelected: isSelected(this.props.selectedRows, key),
        isDragging: this.props.isDragging
    };

    this.previousColumns = slimColumn(this.props.columns.slice());

    result = !(0, _deepEqual2.default)(limitedNextProps, limitedProps);

    return result;
}

var isSelected = exports.isSelected = function isSelected(rows, key) {
    return Boolean(rows && rows.get(key));
};

var isMenuShown = exports.isMenuShown = function isMenuShown(rows, key) {
    return Boolean(rows && rows.get(key));
};

var isEdited = exports.isEdited = function isEdited(editorState, key) {
    return Boolean(editorState && editorState.get(key) && editorState.get(key).values);
};

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