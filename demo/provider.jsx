import React from 'react';
import { Provider } from 'react-redux';
import { Grid, Store, applyGridConfig } from '../src';

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
    treeData,
    examplePromiseDataSource
} from '../demo/demoData';

const config = {
    columns,
    // data,
    // data: treeData,
    // dataSource: treeDataSource,
    // infinite: true,
    stateful: false,
    dataSource: examplePromiseDataSource,
    // dragAndDrop: true,
    // gridType: 'tree',
    pageSize,
    plugins,
    events,
    stateKey
};

export default (
    <Provider store={ Store }>
        <Grid { ...config } />
    </Provider>
);
