import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Row } from './../../../src/components/core/ColumnManager.js';
import { SORT_METHODS, SORT_DIRECTIONS } from './../../../src/constants/GridConstants';
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
    editorState: {}
};

props.store.subscribe = () => {};

describe('A ColumnManager', () => {

    const manager = getColumnManager();
    const store = manager.store;

    it("Should sort asc name locally", () => {
        expect(store.dispatch).toExist();
        
        manager.doSort({
            method: SORT_METHODS.LOCAL,
            column: gridColumns[0],
            direction: SORT_DIRECTIONS.ASCEND,
            dataSource: { data: localGridData },
            stateKey: "__sorter__"
        })

        const after = store.getActions();
        store.clearActions();

        expect(after).toEqual([{ 
            data: [
                { name: 'Michael Jordan', position: 'Shooting Guard' },
                { name: 'David Robinson', position: 'Center' },
                { name: 'Charles Barkley', position: 'Power Forward' }
            ], 
            stateKey: '__sorter__', 
            type: 'SORT_DATA' 
        }]);

    });

    it("Should sort desc name locally", () => {
        expect(store.dispatch).toExist();
        
        manager.doSort({
            method: SORT_METHODS.LOCAL,
            column: gridColumns[0],
            direction: SORT_DIRECTIONS.DESCEND,
            dataSource: { data: localGridData },
            stateKey: "__sorter__"
        })

        const after = store.getActions();
        store.clearActions();

        expect(after).toEqual([{ 
            data: [
                { name: 'Charles Barkley', position: 'Power Forward' },
                { name: 'David Robinson', position: 'Center' },     
                { name: 'Michael Jordan', position: 'Shooting Guard' }
            ], 
            stateKey: '__sorter__', 
            type: 'SORT_DATA' 
        }]);
    });

});
