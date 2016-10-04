'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setColumnsInStorage = undefined;
exports.default = gridState;

var _immutable = require('immutable');

var _ActionTypes = require('./../../constants/ActionTypes');

var _LocalStorageManager = require('./../../components/core/LocalStorageManager');

var _LocalStorageManager2 = _interopRequireDefault(_LocalStorageManager);

var _lastUpdate = require('./../../util/lastUpdate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() });

var debouncedColumnSetter = _LocalStorageManager2.default.debouncedSetStateItem();

function gridState() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];


    switch (action.type) {

        case _ActionTypes.HIDE_HEADER:
            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                headerHidden: action.headerHidden,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.SET_COLUMNS:

            if (action.stateful) {
                setColumnsInStorage({
                    stateKey: action.stateKey,
                    columns: action.columns
                });
            }

            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                columns: action.columns,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.SET_SORT_DIRECTION:
            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                columns: action.columns,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.RESIZE_COLUMNS:

            if (action.stateful) {
                setColumnsInStorage({
                    stateKey: action.stateKey,
                    columns: action.columns
                });
            }

            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                columns: action.columns,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        default:

            return state;
    }
}

var setColumnsInStorage = exports.setColumnsInStorage = function setColumnsInStorage(_ref) {
    var columns = _ref.columns;
    var stateKey = _ref.stateKey;

    debouncedColumnSetter({
        stateKey: stateKey,
        property: 'columns',
        value: columns
    });
};