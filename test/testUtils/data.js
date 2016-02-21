import {
    SET_DATA,
    SET_COLUMNS
} from '../../src/constants/ActionTypes';

import { keyGenerator } from '../../src/util/keyGenerator';

// grid test data

export const gridColumns = [
    {
        name: 'Player',
        id: keyGenerator('Player', 'grid-column')
    },
    {
        name: 'Position',
        id: keyGenerator('Player', 'grid-column')
    }
];

export const defaultColumnManager = {
    defaultColumnWidth: `${100 / gridColumns.length}%`,
    dataSource: 'dataSource',
    minColumnWidth: 10,
    moveable: false,
    resizable: false,
    sortable: {
        enabled: true,
        method: 'LOCAL',
        sortingSource: ''
    }
};

export const localGridData = [
    {
        name: 'Michael Jordan',
        position: 'Shooting Guard'
    },
    {
        name: 'Charles Barkley',
        position: 'Power Forward'
    }
];

export const gridActions = [
    { type: SET_COLUMNS, columns: gridColumns },
    { type: SET_DATA, data: localGridData }
];

export const gridActionsWithFilterContainer = [
    { type: SET_COLUMNS, columns: gridColumns },
    { type: SET_DATA, data: localGridData }
];

// cell test data

export const cellData = 'Cell Data';
