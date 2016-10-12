'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Actions = undefined;

var _ToolbarActions = require('./plugins/bulkactions/ToolbarActions');

var BulkActions = _interopRequireWildcard(_ToolbarActions);

var _ColumnManager = require('./core/ColumnManager');

var ColumnManagerActions = _interopRequireWildcard(_ColumnManager);

var _EditorActions = require('./plugins/editor/EditorActions');

var EditorActions = _interopRequireWildcard(_EditorActions);

var _ErrorHandlerActions = require('./plugins/errorhandler/ErrorHandlerActions');

var ErrorHandlerActions = _interopRequireWildcard(_ErrorHandlerActions);

var _GridActions = require('./GridActions');

var GridActions = _interopRequireWildcard(_GridActions);

var _LoaderActions = require('./plugins/loader/LoaderActions');

var LoaderActions = _interopRequireWildcard(_LoaderActions);

var _MenuActions = require('./plugins/actioncolumn/MenuActions');

var MenuActions = _interopRequireWildcard(_MenuActions);

var _PagerActions = require('./plugins/pager/PagerActions');

var PagerActions = _interopRequireWildcard(_PagerActions);

var _ModelActions = require('./plugins/selection/ModelActions');

var SelectionActions = _interopRequireWildcard(_ModelActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log(SelectionActions);

var Actions = exports.Actions = {
    BulkActions: BulkActions,
    ColumnManagerActions: ColumnManagerActions,
    EditorActions: EditorActions,
    ErrorHandlerActions: ErrorHandlerActions,
    GridActions: GridActions,
    LoaderActions: LoaderActions,
    MenuActions: MenuActions,
    PagerActions: PagerActions,
    SelectionActions: SelectionActions
};

exports.default = Actions;