import { combineReducers } from 'redux';
import grid from './components/grid';
import dataSource from './components/datasource';
import columnManager from './components/columnmanager';
import editor from './components/plugins/editor';
import menu from './components/plugins/menu';
import pager from './components/plugins/pager';
import loader from './components/plugins/loader';
import bulkaction from './components/plugins/bulkaction';
import filter from './components/plugins/filter';
import selection from './components/plugins/selection';
import errorhandler from './components/plugins/errorhandler';

const rootReducer = combineReducers({
    grid,
    dataSource,
    columnManager,
    editor,
    menu,
    pager,
    loader,
    bulkaction,
    filter,
    selection,
    errorhandler
});

export default rootReducer;