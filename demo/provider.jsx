import React from 'react';
import Perf from 'react-addons-perf';
import { Provider } from 'react-redux';
import { Grid, Store, applyGridConfig } from '../src';

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
    // data,
    // data: treeData,
    // dataSource: treeDataSource,
    // infinite: true,
    stateful: false,
    dataSource,
    // dragAndDrop: true,
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
