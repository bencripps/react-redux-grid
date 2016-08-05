import React from 'react';
import Perf from 'react-addons-perf';
import { Provider } from 'react-redux';
import { Grid, Store } from '../src';

window.perf = Perf;
window.perf.start();

import {
    columns,
    data,
    pageSize,
    plugins,
    events,
    dataSource,
    height,
    stateKey
} from '../demo/demoData';

const config = {
    columns,
    data,
    dataSource,
    pageSize,
    plugins,
    events,
    height,
    stateKey,
    store: Store
};

export default (
    <Provider store={ Store }>
        <Grid { ...config } />
    </Provider>
);
