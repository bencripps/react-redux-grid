import { combineReducers } from 'redux';
import grid from './components/grid';
import pager from './components/plugins/pager';
import loader from './components/plugins/loader';
import dataSource from './components/datasource';

const rootReducer = combineReducers({
    grid,
    pager,
    loader,
    dataSource
});

export default rootReducer;