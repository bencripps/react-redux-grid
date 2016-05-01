import React from 'react';
import { Provider } from 'react-redux';
import { Grid, Store } from '../src';

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

const gridData = {
    columns,
    data,
    pageSize,
    plugins,
    events,
    dataSource,
    height,
    stateKey,
    store: Store
};

export default (
    <Provider store={ Store }>
        <Grid { ...gridData } />
    </Provider>
);