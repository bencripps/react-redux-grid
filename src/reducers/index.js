import { combineReducers } from 'redux';
import grid from './components/grid';
import dataSource from './components/datasource';
import editor from './components/plugins/editor';
import menu from './components/plugins/menu';
import pager from './components/plugins/pager';
import loader from './components/plugins/loader';
import bulkaction from './components/plugins/bulkaction';
import selection from './components/plugins/selection';
import errorhandler from './components/plugins/errorhandler';

export const rootReducer = combineReducers({
    bulkaction,
    dataSource,
    editor,
    errorhandler,
    grid,
    menu,
    pager,
    loader,
    selection
});

export const Reducers = {
    BulkActions: bulkaction,
    DataSource: dataSource,
    Editor: editor,
    ErrorHandler: errorhandler,
    Grid: grid,
    Loader: loader,
    Menu: menu,
    Pager: pager,
    Selection: selection
};

export default rootReducer;
