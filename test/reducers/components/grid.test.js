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

    const state = fromJS({});

    const action = {
        stateKey: 'test-grid',
        type: SET_COLUMNS,
        columns
    };

    const outState = fromJS({
        'test-grid': {
            columns
        }
    });

    it('Should set passing cols', () => {
        expect(
            grid(state, action)
        ).toEqual(outState);
    });

});

describe('The grid reducer SET_SORT_DIRECTION func', () => {
    const state = fromJS({});

    const action = {
        stateKey: 'test-grid',
        type: SET_SORT_DIRECTION,
        columns
    };

    const outState = fromJS({
        'test-grid': {
            columns
        }
    });

    it('Should set cols after sort action', () => {
        expect(
            grid(state, action)
        ).toEqual(outState);
    });
});

describe('The grid reducer resizeCols func', () => {
    const state = fromJS({});

    const action = {
        stateKey: 'test-grid',
        type: RESIZE_COLUMNS,
        columns
    };

    const outState = fromJS({
        'test-grid': {
            columns
        }
    });

    it('Should set cols after resize action', () => {
        expect(
            grid(state, action)
        ).toEqual(outState);
    });

});