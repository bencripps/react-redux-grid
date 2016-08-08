'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setIndexes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = selection;

var _immutable = require('immutable');

var _ActionTypes = require('../../../constants/ActionTypes');

var _lastUpdate = require('./../../../util/lastUpdate');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() });

function selection() {
    var _fromJS2;

    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];


    switch (action.type) {

        case _ActionTypes.SELECT_ALL:
            return state.setIn([action.stateKey], (0, _immutable.fromJS)(_extends({}, action.selection, {
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            })));

        case _ActionTypes.DESELECT_ALL:
            return state.setIn([action.stateKey], (0, _immutable.fromJS)({
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.SET_DATA:
            return state.setIn([action.stateKey], (0, _immutable.fromJS)({
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.SET_SELECTION:
            var currentValue = state.getIn([action.stateKey, action.id]);
            var currentIndexes = state.getIn([action.stateKey, 'indexes']);
            var isSelectAction = action.allowDeselect ? !currentValue : true;
            var indexes = setIndexes(action.index, currentIndexes && currentIndexes.toJS ? currentIndexes.toJS() : currentIndexes, !isSelectAction);

            if (action.clearSelections || !state.get(action.stateKey)) {
                var _fromJS;

                return state.setIn([action.stateKey], (0, _immutable.fromJS)((_fromJS = {}, _defineProperty(_fromJS, action.id, isSelectAction), _defineProperty(_fromJS, 'indexes', isSelectAction ? [action.index] : []), _defineProperty(_fromJS, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS)));
            }

            // multiselect
            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)((_fromJS2 = {}, _defineProperty(_fromJS2, action.id, isSelectAction), _defineProperty(_fromJS2, 'indexes', indexes), _defineProperty(_fromJS2, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS2)));

        default:
            return state;
    }
}

var setIndexes = exports.setIndexes = function setIndexes(ids) {
    var previous = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var isRemove = arguments[2];


    if (!isRemove) {

        if (Array.isArray(ids)) {

            ids.forEach(function (id) {
                if (previous.indexOf(id) === -1) {
                    previous.push(id);
                }
            });
        } else {

            if (previous.indexOf(ids) !== -1) {
                return previous;
            }

            previous.push(ids);
            return previous;
        }
    } else if (isRemove) {
        var _ret = function () {

            var idx = void 0;

            if (Array.isArray(ids)) {

                ids.forEach(function (id) {
                    idx = previous.indexOf(id);
                    if (idx !== -1) {
                        previous.splice(idx, 1);
                    }
                });
            } else {

                idx = previous.indexOf(ids);

                if (idx !== -1) {
                    previous.splice(idx, 1);
                    return {
                        v: previous
                    };
                }

                return {
                    v: previous
                };
            }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    return previous;
};