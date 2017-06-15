/* eslint-enable describe it */
import expect from 'expect';

import {
    REMOVE_TOOLBAR
} from './../../../../src/constants/ActionTypes';

import bulkaction from './../../../../src/reducers/components/plugins/bulkaction'; // eslint-disable-line

import { resetLastUpdate } from './../../../../src/util/lastUpdate';
import { BulkAction as BulkActionRecord } from './../../../../src/records';
import { testState } from './../../../testUtils';

describe('The bulkaction reducer', () => {
    beforeEach(() => resetLastUpdate());

    it('Should set toolbar as visible', () => {

        const state = testState({
            'test-grid': {
                isRemoved: true
            }
        });

        const action = {
            type: REMOVE_TOOLBAR,
            value: false,
            stateKey: 'test-grid'
        };

        expect(
            bulkaction(state, action).get('test-grid')
        ).toEqual(
            new BulkActionRecord({
                isRemoved: false,
                lastUpdate: 1
            })
        );

    });

    it('Should set toolbar as removed', () => {

        const state = testState({
            'test-grid': {
                isRemoved: false
            }
        });

        const action = {
            type: REMOVE_TOOLBAR,
            value: true,
            stateKey: 'test-grid'
        };

        expect(
            bulkaction(state, action).get('test-grid')
        ).toEqual(
            new BulkActionRecord({
                isRemoved: true,
                lastUpdate: 1
            })
        );

    });

});
