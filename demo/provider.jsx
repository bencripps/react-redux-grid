import React from 'react';
import Grid from '../src/components/Grid.jsx';
import { Provider } from 'react-redux';
import store from '../src/store/store';

import { 
	columns, 
	data,
	pageSize,
	plugins,
	events,
	dataSource
} from '../demo/demoData';

const gridData = {
	columns,
	// data,
	pageSize,
	plugins,
	events,
	dataSource,
	store
}

export default (
    <Provider store={ store }>
        <Grid { ...gridData } />
    </Provider>
);