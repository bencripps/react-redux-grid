import expect from 'expect';
import { OrderedMap } from 'immutable';

import {
    SORT_METHODS, SORT_DIRECTIONS
} from './../../../src/constants/GridConstants';
import { mockStore, getColumnManager } from './../../testUtils/index';
import {
    gridColumns,
    gridActions,
    localGridData,
    defaultColumnManager
} from './../../testUtils/data';

const props = {
    columnManager: defaultColumnManager,
    columns: gridColumns,
    store: mockStore({}, ...gridActions),
    data: localGridData,
    editorState: new OrderedMap();
};

props.store.subscribe = () => {};

describe('A ColumnManager', () => {

    const manager = getColumnManager();
    const store = manager.store;

    it('Should sort locally', () => {

        expect(store.dispatch).toExist();

        manager.doSort({
            method: SORT_METHODS.LOCAL,
            column: gridColumns[0],
            direction: SORT_DIRECTIONS.DESCEND,
            dataSource: { data: localGridData },
            stateKey: '__sorter__'
        });

        const after = store.getActions();

        expect(after).toEqual([{
            data: [
            { name: 'Charles Barkley', position: 'Power Forward', _key: 'row-1' },
            { name: 'Michael Jordan', position: 'Shooting Guard', _key: 'row-0' }
            ],
            stateKey: '__sorter__',
            type: '@@react-redux-grid/SORT_DATA'
        }]);
    });

});
