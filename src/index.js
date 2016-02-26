import { combineReducers } from 'redux';

import { ConnectedGrid } from './components/Grid.jsx';
import Store from './store/store';

import { Reducers } from './reducers';

const modules = {
    Grid: ConnectedGrid,
    Store,
    Reducers,
    GridRootReducer: combineReducers(Reducers)
};

module.exports = modules;
