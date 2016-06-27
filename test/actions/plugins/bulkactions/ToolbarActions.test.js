import expect from 'expect';

import {
    REMOVE_TOOLBAR
} from './../../../../src/constants/ActionTypes';

import {
    removeToolbar
} from './../../../../src/actions/plugins/bulkactions/ToolbarActions';

describe('The grid removeToolbar Action', () => {

    it('Should remove the toolbar', () => {

        const action = {
            type: REMOVE_TOOLBAR,
            state: true,
            stateKey: 'test-grid'
        };

        expect(removeToolbar(action))
            .toEqual({
                type: REMOVE_TOOLBAR,
                value: true,
                stateKey: 'test-grid'
            });

    });

    it('Should show the toolbar', () => {

        const action = {
            type: REMOVE_TOOLBAR,
            state: false,
            stateKey: 'test-grid'
        };

        expect(removeToolbar(action))
            .toEqual({
                type: REMOVE_TOOLBAR,
                value: false,
                stateKey: 'test-grid'
            });

    });

});
