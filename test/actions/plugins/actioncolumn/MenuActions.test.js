import expect from 'expect';

import {
    SHOW_MENU,
    HIDE_MENU
} from './../../../../src/constants/ActionTypes';

import {
    showMenu,
    hideMenu
} from './../../../../src/actions/plugins/actioncolumn/MenuActions';

describe('The grid showMenu Action', () => {

    it('Should return the correct hide menu response', () => {

        const action = {
            type: SHOW_MENU,
            id: 'uniqueId',
            stateKey: 'test-grid'
        };

        expect(showMenu(action))
            .toEqual({
                type: SHOW_MENU,
                id: 'uniqueId',
                stateKey: 'test-grid'
            });

    });

});

describe('The grid hideMenu Action', () => {

    it('Should return the correct hide menu response', () => {

        const action = {
            type: HIDE_MENU,
            id: 'uniqueId',
            stateKey: 'test-grid'
        };

        expect(hideMenu(action))
            .toEqual({
                type: HIDE_MENU,
                id: 'uniqueId',
                stateKey: 'test-grid'
            });

    });

});

