'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setColumnsInStorage = exports.resizeColumns = exports.setSortDirection = exports.setColumns = exports.hideHeader = undefined;

var _lastUpdate = require('./../../util/lastUpdate');

var _records = require('./../../records');

var _LocalStorageManager = require('./../../components/core/LocalStorageManager');

var _LocalStorageManager2 = _interopRequireDefault(_LocalStorageManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debouncedColumnSetter = _LocalStorageManager2.default.debouncedSetStateItem();

var hideHeader = exports.hideHeader = function hideHeader(state, _ref) {
    var stateKey = _ref.stateKey,
        headerHidden = _ref.headerHidden;
    return state.setIn([stateKey], new _records.Grid({
        headerHidden: headerHidden,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var setColumns = exports.setColumns = function setColumns(state, _ref2) {
    var columns = _ref2.columns,
        stateKey = _ref2.stateKey,
        stateful = _ref2.stateful;

    if (stateful) {
        setColumnsInStorage({
            stateKey: stateKey,
            columns: columns
        });
    }

    return state.setIn([stateKey], new _records.Grid({
        columns: columns,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var setSortDirection = exports.setSortDirection = function setSortDirection(state, _ref3) {
    var stateKey = _ref3.stateKey,
        columns = _ref3.columns;
    return state.setIn([stateKey], new _records.Grid({
        columns: columns,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var resizeColumns = exports.resizeColumns = function resizeColumns(state, _ref4) {
    var stateful = _ref4.stateful,
        stateKey = _ref4.stateKey,
        columns = _ref4.columns;

    if (stateful) {
        setColumnsInStorage({
            stateKey: stateKey,
            columns: columns
        });
    }

    return state.setIn([stateKey], new _records.Grid({
        columns: columns,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var setColumnsInStorage = exports.setColumnsInStorage = function setColumnsInStorage(_ref5) {
    var columns = _ref5.columns,
        stateKey = _ref5.stateKey;

    debouncedColumnSetter({
        stateKey: stateKey,
        property: 'columns',
        value: columns
    });
};