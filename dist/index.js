'use strict';

var _redux = require('redux');

var _Grid = require('./components/Grid');

var _store = require('./store/store');

var _store2 = _interopRequireDefault(_store);

var _reducers = require('./reducers');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modules = {
    Actions: _actions.Actions,
    Grid: _Grid.ConnectedGrid,
    GridRootReducer: (0, _redux.combineReducers)(_reducers.Reducers),
    Reducers: _reducers.Reducers,
    Store: _store2.default
};

module.exports = modules;