import { combineReducers } from 'redux';
import grid from './components/grid';
import pager from './components/plugins/pager';
import dataSource from './components/datasource';

const rootReducer = combineReducers({
    grid,
    pager,
    dataSource
});

export default rootReducer;