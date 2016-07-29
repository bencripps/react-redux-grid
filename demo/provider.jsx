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
    height
} from '../demo/demoData';

const localConfig = {
    columns,
    data,
    pageSize,
    plugins,
    events,
    height,
    stateKey: 'local-data-grid-stateKey',
    store: Store
};

const remoteConfig = {
    columns,
    dataSource,
    pageSize,
    plugins,
    events,
    height,
    stateKey: 'remote-data-grid-stateKey',
    store: Store
};

function provider(config) {
    return (
        <Provider store={ Store }>
        <Grid { ...config } />
    </Provider>
    )
};

export {
    provider,
    localConfig,
    remoteConfig
}