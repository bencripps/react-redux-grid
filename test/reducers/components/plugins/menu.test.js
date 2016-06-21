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

import {
    generateLastUpdate,
    resetLastUpdate
} from './../../../../src/util/lastUpdate';

describe('The menu reducer SHOW_MENU action', () => {
    beforeEach(() => resetLastUpdate());

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
        ).toEqualImmutable(fromJS({
            'test-grid': {
                newId: true,
                lastUpdate: 1
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
        ).toEqualImmutable(fromJS({
            'test-grid': {
                newId: true,
                lastUpdate: 1
            }
        }));

    });

});

describe('The menu reducer HIDE_MENU action', () => {
    beforeEach(() => resetLastUpdate());

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
        ).toEqualImmutable(fromJS({
            'test-grid': {
                newId: false,
                lastUpdate: 1
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
        ).toEqualImmutable(fromJS({
            'test-grid': {
                newId: false,
                lastUpdate: 1
            }
        }));

    });

});