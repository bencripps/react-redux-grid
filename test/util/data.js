import { 
    SET_DATA,
    SET_COLUMNS 
} from '../../src/constants/ActionTypes';

import { keyGenerator } from '../../src/util/keygenerator';

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
