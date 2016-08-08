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
    bulkaction: _bulkaction2.default,
    dataSource: _datasource2.default,
    editor: _editor2.default,
    errorhandler: _errorhandler2.default,
    grid: _grid2.default,
    menu: _menu2.default,
    pager: _pager2.default,
    loader: _loader2.default,
    selection: _selection2.default
});

var Reducers = exports.Reducers = {
    BulkActions: _bulkaction2.default,
    DataSource: _datasource2.default,
    Editor: _editor2.default,
    ErrorHandler: _errorhandler2.default,
    Grid: _grid2.default,
    Loader: _loader2.default,
    Menu: _menu2.default,
    Pager: _pager2.default,
    Selection: _selection2.default
};

exports.default = rootReducer;