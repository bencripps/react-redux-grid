import Grid from './components/Grid.jsx';
import Store from './store/store';

import columnmanager from './reducers/columnmanager';
import datasource from './reducers/datasource';
import grid from './reducers/grid';

import bulkaction from './reducers/plugins/bulkaction';
import editor from './reducers/plugins/editor';
import errorhandler from './reducers/plugins/errorhandler';
import filter from './reducers/plugins/filter';
import loader from './reducers/plugins/loader';
import menu from './reducers/plugins/menu';
import pager from './reducers/plugins/pager';
import selection from './reducers/plugins/selection';

const Reducers = {
    ColumnManager: columnmanager,
    DataSource: datasource,
    Grid: grid,
    BulkActions: bulkaction,
    Editor: editor,
    ErrorHandler: errorhandler,
    Filter: filter,
    Loader: loader,
    Menu: menu,
    Pager: pager,
    Selection: selection
};

const modules = {
    Grid,
    Store,
    Reducers
};

module.exports = modules;
