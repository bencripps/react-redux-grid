/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    SET_COLUMNS,
    RESIZE_COLUMNS,
    SET_SORT_DIRECTION
} from './../../../src/constants/ActionTypes';

import
    grid
from './../../../src/reducers/components/grid';

import {
    resetLastUpdate
} from './../../../src/util/lastUpdate';

import {
    Grid as GridRecord
} from './../../../src/records';

import { testState } from './../../testUtils';

const columns = [
    {
        name: 'col1',
        renderer: () => {},
        dataIndex: 'col-1'
    },
    {
        name: 'col2',
        dataIndex: 'col-2'
    }
];

describe('The grid reducer setCol func', () => {
    beforeEach(() => resetLastUpdate());

    const state = testState();

    const action = {
        stateKey: 'test-grid',
        type: SET_COLUMNS,
        columns
    };

    it('Should set passing cols', () => {
        expect(
            grid(state, action).get('test-grid')
        ).toEqualImmutable(
            new GridRecord({
                columns,
                lastUpdate: 1
            })
        );
    });

});

describe('The grid reducer SET_SORT_DIRECTION func', () => {
    beforeEach(() => resetLastUpdate());

    const state = testState();

    const action = {
        stateKey: 'test-grid',
        type: SET_SORT_DIRECTION,
        columns
    };

    it('Should set cols after sort action', () => {
        expect(
            grid(state, action).get('test-grid')
        ).toEqualImmutable(
            new GridRecord({
                columns,
                lastUpdate: 1
            })
        );
    });
});

describe('The grid reducer resizeCols func', () => {
    beforeEach(() => resetLastUpdate());

    const state = testState();

    const action = {
        stateKey: 'test-grid',
        type: RESIZE_COLUMNS,
        columns
    };

    it('Should set cols after resize action', () => {
        expect(
            grid(state, action).get('test-grid')
        ).toEqualImmutable(
            new GridRecord({
                columns,
                lastUpdate: 1
            })
        );
    });

});
