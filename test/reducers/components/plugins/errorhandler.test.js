/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    ERROR_OCCURRED,
    DISMISS_ERROR
} from './../../../../src/constants/ActionTypes';

import
    errorhandler
from './../../../../src/reducers/components/plugins/errorhandler';

import {
    resetLastUpdate
} from './../../../../src/util/lastUpdate';

describe('The errorhandler reducer', () => {
    beforeEach(() => resetLastUpdate());

    it('Should set an error if state was blank', () => {

        const state = fromJS({});

        const action = {
            type: ERROR_OCCURRED,
            error: 'A generic error occurred dude',
            stateKey: 'test-grid'
        };

        expect(
            errorhandler(state, action)
        ).toEqualImmutable(fromJS({
            'test-grid': {
                error: 'A generic error occurred dude',
                errorOccurred: true,
                lastUpdate: 1
            }
        }));

    });

    it('Should set an error if state was had an earlier error', () => {

        const state = fromJS({
            'test-grid': {
                error: 'A generic error occurred dude',
                errorOccurred: true
            }
        });

        const action = {
            type: ERROR_OCCURRED,
            error: 'A newer error happened',
            stateKey: 'test-grid'
        };

        expect(
            errorhandler(state, action)
        ).toEqualImmutable(fromJS({
            'test-grid': {
                error: 'A newer error happened',
                errorOccurred: true,
                lastUpdate: 1
            }
        }));

    });

    it('Should wipe an error if state was had an earlier error', () => {

        const state = fromJS({
            'test-grid': {
                error: 'A generic error occurred dude',
                errorOccurred: true,
                lastUpdate: 1
            }
        });

        const action = {
            type: DISMISS_ERROR,
            stateKey: 'test-grid'
        };

        expect(
            errorhandler(state, action)
        ).toEqualImmutable(fromJS({
            'test-grid': {
                error: '',
                errorOccurred: false,
                lastUpdate: 1
            }
        }));

    });

});
