/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    SET_LOADING_STATE
} from './../../../../src/constants/ActionTypes';

import
    loader
from './../../../../src/reducers/components/plugins/loader';

import {
    generateLastUpdate,
    resetLastUpdate
} from './../../../../src/util/lastUpdate';

describe('The loader reducer SET_LOADING_STATE action', () => {
    beforeEach(() => resetLastUpdate());

    it('Should set loading to true', () => {

        const state = fromJS({});

        const action = {
            type: SET_LOADING_STATE,
            stateKey: 'test-grid',
            state: true
        };

        expect(
            loader(state, action)
        ).toEqualImmutable(fromJS({
            'test-grid': {
                isLoading: true,
                lastUpdate: 1
            }
        }));

    });

    it('Should set loading to false', () => {

        const state = fromJS({});

        const action = {
            type: SET_LOADING_STATE,
            stateKey: 'test-grid',
            state: false
        };

        expect(
            loader(state, action)
        ).toEqualImmutable(fromJS({
            'test-grid': {
                isLoading: false,
                lastUpdate: 1
            }
        }));

    });

});