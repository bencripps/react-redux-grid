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
    treeDataSource,
    stateful,
    height,
    stateKey,
    treeData
} from '../demo/demoData';

const config = {
    columns,
    // dataSource: treeDataSource,
    stateful,
    dataSource,
    // gridType: 'tree',
    pageSize,
    plugins,
    events,
    stateKey,
    store: Store
};

export default (
    <Provider store={ Store }>
        <Grid { ...config } />
    </Provider>
);
