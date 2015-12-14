import React from 'react';
import Grid from './components/Grid.jsx';
import { Provider } from 'react-redux';
import store from './store/store';

import { 
	columns, 
	data,
	onCellClick,
	onCellDblClick 
} from '../demo/demoData';

const gridData = {
	columns,
	data,
	onCellClick,
	onCellDblClick
}

export default (
    <Provider store={ store }>
        <Grid { ...gridData } />
    </Provider>
);