import { combineReducers } from 'redux';

import Grid from './components/Grid';
import Store from './store/store';

import { Reducers } from './reducers';

import { Actions } from './actions';

import { applyGridConfig } from './constants/GridConstants';

const modules = {
    Actions,
    Grid,
    Reducers,
    applyGridConfig,
    Store
};

module.exports = modules;
