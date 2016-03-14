import { combineReducers } from 'redux';

import { ConnectedGrid } from './components/Grid.jsx';
import Store from './store/store';

import { Reducers } from './reducers';

import { Actions } from './actions';

const modules = {
    Actions,
    Grid: ConnectedGrid,
    GridRootReducer: combineReducers(Reducers),
    Reducers,
    Store
};

module.exports = modules;
