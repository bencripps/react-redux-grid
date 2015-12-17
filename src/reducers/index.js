import { combineReducers } from 'redux';
import grid from './components/grid';
import pager from './components/plugins/pager';

const rootReducer = combineReducers({
    grid,
    pager
});

export default rootReducer;