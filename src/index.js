import { combineReducers } from 'redux';

import { ConnectedGrid } from './components/Grid.jsx';
import Store from './store/store';

import columnmanager from './reducers/components/columnmanager';
import datasource from './reducers/components/datasource';
import grid from './reducers/components/grid';

import bulkaction from './reducers/components/plugins/bulkaction';
import editor from './reducers/components/plugins/editor';
import errorhandler from './reducers/components/plugins/errorhandler';
import filter from './reducers/components/plugins/filter';
import loader from './reducers/components/plugins/loader';
import menu from './reducers/components/plugins/menu';
import pager from './reducers/components/plugins/pager';
import selection from './reducers/components/plugins/selection';

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
    Grid: ConnectedGrid,
    Store,
    Reducers,
    GridRootReducer: combineReducers(Reducers)
};

module.exports = modules;
