/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    REMOVE_TOOLBAR
} from './../../../../src/constants/ActionTypes';

import
    bulkaction
from './../../../../src/reducers/components/plugins/bulkaction';

import {
    generateLastUpdate,
    resetLastUpdate
} from './../../../../src/util/lastUpdate';

describe('The bulkaction reducer', () => {
    beforeEach(() => resetLastUpdate());

    it('Should set toolbar as visible', () => {

        const state = fromJS({
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
            bulkaction(state, action)
        ).toEqual(
            fromJS({
                'test-grid': {
                    isRemoved: false,
                    lastUpdate: 1
                }
            })
        );

    });

    it('Should set toolbar as removed', () => {

        const state = fromJS({
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
            bulkaction(state, action)
        ).toEqual(
            fromJS({
                'test-grid': {
                    isRemoved: true,
                    lastUpdate: 1
                }
            })
        );

    });

});
