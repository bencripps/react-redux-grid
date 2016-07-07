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

export default (
    <Provider store={ Store }>
        <div>
            <div>
                <h1>Local Data Grid</h1>
                <Grid { ...localConfig } />
            </div>
            <div>
                <h1>Remote Data Grid</h1>
                <Grid { ...remoteConfig } />
            </div>
        </div>
    </Provider>
);