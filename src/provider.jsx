import React from 'react';
import Grid from './components/Grid.jsx';
import { Provider } from 'react-redux';
import store from './store/store';

import { columns, data } from '../demo/demoData';

export default (
    <Provider store={ store }>
        <Grid columns={ columns } data={ data } />
    </Provider>
);