/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    SHOW_MENU,
    HIDE_MENU
} from './../../../../src/constants/ActionTypes';

import
    menu
from './../../../../src/reducers/components/plugins/menu';

describe('The menu reducer SHOW_MENU action', () => {

    it('Should show a menu, hiding the previously opened menu', () => {

        const state = fromJS({
            'test-grid': {
                oldId: true
            }
        });

        const action = {
            type: SHOW_MENU,
            stateKey: 'test-grid',
            id: 'newId'
        };

        expect(
            menu(state, action)
        ).toEqual(fromJS({
            'test-grid': {
                newId: true
            }
        }));

    });

    it('Should show a menu, even if none were open', () => {

        const state = fromJS({});

        const action = {
            type: SHOW_MENU,
            stateKey: 'test-grid',
            id: 'newId'
        };

        expect(
            menu(state, action)
        ).toEqual(fromJS({
            'test-grid': {
                newId: true
            }
        }));

    });

});

describe('The menu reducer HIDE_MENU action', () => {

    it('Should hide a menu, also hiding the previously opened menu', () => {

        const state = fromJS({
            'test-grid': {
                oldId: true
            }
        });

        const action = {
            type: HIDE_MENU,
            stateKey: 'test-grid',
            id: 'newId'
        };

        expect(
            menu(state, action)
        ).toEqual(fromJS({
            'test-grid': {
                newId: false
            }
        }));

    });

    it('Should show a menu, even if none were open', () => {

        const state = fromJS({});

        const action = {
            type: HIDE_MENU,
            stateKey: 'test-grid',
            id: 'newId'
        };

        expect(
            menu(state, action)
        ).toEqual(fromJS({
            'test-grid': {
                newId: false
            }
        }));

    });

});