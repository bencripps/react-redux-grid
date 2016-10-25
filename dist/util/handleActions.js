'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var TYPE_ERROR = 'handleActions: Action Types should be not be undefined';
var ACTION_ERROR = 'handleActions: action object should be not be undefined';

var handleActions = exports.handleActions = function handleActions(map, initialState) {
    Object.keys(map).forEach(function (key) {
        if (key === 'undefined') {
            throw new Error(TYPE_ERROR);
        }
    });

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        if (!action) {
            throw new Error(ACTION_ERROR);
        }

        if (action.type === undefined) {
            throw new Error(TYPE_ERROR);
        }

        var reducerSubFunction = map[action.type];

        if (typeof reducerSubFunction === 'function') {
            return reducerSubFunction(state, action);
        }

        return state;
    };
};

exports.default = handleActions;