import expect from 'expect';

import {
    DISMISS_ERROR
} from './../../../../src/constants/ActionTypes';

import {
    dismissError
} from './../../../../src/actions/plugins/errorhandler/ErrorHandlerActions';

describe('The grid dismissError Action', () => {

    it('Should dismiss previuos errors', () => {

        const action = {
            type: DISMISS_ERROR,
            stateKey: 'test-grid'
        };

        expect(dismissError(action))
            .toEqual({
                type: DISMISS_ERROR,
                stateKey: 'test-grid'
            });

    });

});
