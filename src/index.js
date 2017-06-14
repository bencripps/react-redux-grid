import Grid from './components/Grid';
import Store from './store/store';

import { Reducers } from './reducers';

import { Actions } from './actions';

import { applyGridConfig } from './constants/GridConstants';
import * as ActionTypes from './constants/ActionTypes';

const modules = {
    Actions,
    Grid,
    Reducers,
    applyGridConfig,
    ActionTypes,
    Store
};

module.exports = modules;
