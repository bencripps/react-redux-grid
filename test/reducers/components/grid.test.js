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

    const state = fromJS({});

    const action = {
        stateKey: 'test-grid',
        type: SET_COLUMNS,
        columns
    };

    const outState = fromJS({
        'test-grid': {
            columns,
            lastUpdate: 1
        }
    });

    it('Should set passing cols', () => {
        expect(
            grid(state, action)
        ).toEqualImmutable(outState);
    });

});

describe('The grid reducer SET_SORT_DIRECTION func', () => {
    beforeEach(() => resetLastUpdate());

    const state = fromJS({});

    const action = {
        stateKey: 'test-grid',
        type: SET_SORT_DIRECTION,
        columns
    };

    const outState = fromJS({
        'test-grid': {
            columns,
            lastUpdate: 1
        }
    });

    it('Should set cols after sort action', () => {
        expect(
            grid(state, action)
        ).toEqualImmutable(outState);
    });
});

describe('The grid reducer resizeCols func', () => {
    beforeEach(() => resetLastUpdate());

    const state = fromJS({});

    const action = {
        stateKey: 'test-grid',
        type: RESIZE_COLUMNS,
        columns
    };

    const outState = fromJS({
        'test-grid': {
            columns,
            lastUpdate: 1
        }
    });

    it('Should set cols after resize action', () => {
        expect(
            grid(state, action)
        ).toEqualImmutable(outState);
    });

});