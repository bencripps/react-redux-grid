import * as BulkActions from './plugins/bulkactions/ToolbarActions';

import * as ColumnManagerActions from './core/ColumnManager';

import * as EditorActions from './plugins/editor/EditorActions';

import * as ErrorHandlerActions from './plugins/errorhandler/ErrorHandlerActions'; // eslint-disable-line

import * as GridActions from './GridActions';

import * as LoaderActions from './plugins/loader/LoaderActions';

import * as MenuActions from './plugins/actioncolumn/MenuActions';

import * as PagerActions from './plugins/pager/PagerActions';

import * as SelectionActions from './plugins/selection/ModelActions';

export const Actions = {
    BulkActions,
    ColumnManagerActions,
    EditorActions,
    ErrorHandlerActions,
    GridActions,
    LoaderActions,
    MenuActions,
    PagerActions,
    SelectionActions
};

export default Actions;
