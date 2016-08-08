'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = dataSource;

var _immutable = require('immutable');

var _ActionTypes = require('../../constants/ActionTypes');

var _lastUpdate = require('./../../util/lastUpdate');

var initialState = (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() });

function dataSource() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    switch (action.type) {

        case _ActionTypes.SET_DATA:
            return state.setIn([action.stateKey], (0, _immutable.fromJS)({
                data: action.data,
                proxy: action.data,
                total: action.total || action.data.length,
                currentRecords: action.currentRecords || action.data,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.DISMISS_EDITOR:
            var previousData = state.getIn([action.stateKey, 'data']);
            var previousProxy = state.getIn([action.stateKey, 'proxy']);
            var previousTotal = state.getIn([action.stateKey, 'total']);

            // upon dismiss, if a new row was in edit
            // but isn't save, update the total to reflect that
            if (previousData && previousProxy && previousData.size > previousProxy.size) {
                previousTotal = previousProxy.size;
            }

            if (state.get(action.stateKey)) {
                return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                    data: previousProxy,
                    proxy: previousProxy,
                    currentRecords: previousProxy,
                    total: previousTotal,
                    isEditing: false,
                    lastUpdate: (0, _lastUpdate.generateLastUpdate)()
                }));
            }

            return state;

        case _ActionTypes.REMOVE_ROW:
            var remainingRows = state.getIn([action.stateKey, 'data']).remove(action.rowIndex || 0, 1);

            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                data: remainingRows,
                proxy: remainingRows,
                currentRecords: remainingRows,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.UPDATE_ROW:

            var existingData = state.getIn([action.stateKey, 'data']);
            var prevRow = existingData ? existingData.get(action.rowIndex) : null;

            if (!prevRow) {
                return state;
            }

            var updatedRow = prevRow.merge(action.values);
            var updatedData = state.getIn([action.stateKey, 'data']).set(action.rowIndex, updatedRow);

            return state.mergeIn([action.stateKey], {
                data: updatedData,
                proxy: updatedData,
                currentRecords: updatedData,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        case _ActionTypes.ADD_NEW_ROW:

            var existingState = state.get(action.stateKey);
            var isEditing = existingState && existingState.get('isEditing');
            var data = existingState && existingState.get('data');

            if (existingState && isEditing) {
                return state;
            }

            var newRow = data && data.size > 0 && data.get(0) ? data.get(0).map(function (k, v) {
                return v = '';
            }) : (0, _immutable.fromJS)({});

            var newData = data.unshift(newRow);

            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                data: newData,
                proxy: data,
                isEditing: true,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)(),
                total: newData.size
            }));

        case _ActionTypes.SAVE_ROW:
            var gridData = state.getIn([action.stateKey, 'data']).set(action.rowIndex, (0, _immutable.fromJS)(action.values));

            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                data: gridData,
                proxy: gridData,
                currentRecords: gridData,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.SORT_DATA:
            return state.mergeIn([action.stateKey], {
                data: action.data,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        case _ActionTypes.CLEAR_FILTER_LOCAL:

            var proxy = state.getIn([action.stateKey, 'proxy']);
            var prevData = state.getIn([action.stateKey, 'data']);
            var recs = proxy || prevData;

            return state.mergeIn([action.stateKey], {
                data: recs,
                proxy: recs,
                currentRecords: recs,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        case _ActionTypes.FILTER_DATA:
            return state.mergeIn([action.stateKey], {
                data: action.data,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        default:

            return state;
    }
}