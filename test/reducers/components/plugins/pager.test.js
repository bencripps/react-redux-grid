/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    PAGE_LOCAL,
    PAGE_REMOTE
} from './../../../../src/constants/ActionTypes';

import
    pager
from './../../../../src/reducers/components/plugins/pager';

describe('The pager reducer PAGE_LOCAL action', () => {

    it('Should set pageIndex locally', () => {

        const state = fromJS({});

        const action = {
            type: PAGE_LOCAL,
            stateKey: 'test-grid',
            pageIndex: 26
        };

        expect(
            pager(state, action)
        ).toEqual(fromJS({
            'test-grid': {
                pageIndex: 26
            }
        }));

    });

});

describe('The pager reducer PAGE_REMOTE action', () => {

    it('Should set pageIndex locally', () => {

        const state = fromJS({});

        const action = {
            type: PAGE_REMOTE,
            stateKey: 'test-grid',
            pageIndex: 19
        };

        expect(
            pager(state, action)
        ).toEqual(fromJS({
            'test-grid': {
                pageIndex: 19
            }
        }));

    });
});