'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Reducers = exports.rootReducer = undefined;

var _redux = require('redux');

var _grid = require('./components/grid');

var _grid2 = _interopRequireDefault(_grid);

var _datasource = require('./components/datasource');

var _datasource2 = _interopRequireDefault(_datasource);

var _editor = require('./components/plugins/editor');

var _editor2 = _interopRequireDefault(_editor);

var _menu = require('./components/plugins/menu');

var _menu2 = _interopRequireDefault(_menu);

var _pager = require('./components/plugins/pager');

var _pager2 = _interopRequireDefault(_pager);

var _loader = require('./components/plugins/loader');

var _loader2 = _interopRequireDefault(_loader);

var _bulkaction = require('./components/plugins/bulkaction');

var _bulkaction2 = _interopRequireDefault(_bulkaction);

var _selection = require('./components/plugins/selection');

var _selection2 = _interopRequireDefault(_selection);

var _errorhandler = require('./components/plugins/errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = exports.rootReducer = (0, _redux.combineReducers)({
    bulkAction: _bulkaction2.default,
    dataSource: _datasource2.default,
    editor: _editor2.default,
    errorHandler: _errorhandler2.default,
    grid: _grid2.default,
    menu: _menu2.default,
    pager: _pager2.default,
    loader: _loader2.default,
    selection: _selection2.default
});

var Reducers = exports.Reducers = {
    bulkAction: _bulkaction2.default,
    dataSource: _datasource2.default,
    editor: _editor2.default,
    errorHandler: _errorhandler2.default,
    grid: _grid2.default,
    loader: _loader2.default,
    menu: _menu2.default,
    pager: _pager2.default,
    selection: _selection2.default
};

exports.default = rootReducer;