/* eslint-enable describe it */
import expect from 'expect';

import {
    SHOW_MENU,
    HIDE_MENU
} from './../../../../src/constants/ActionTypes';

import menu from './../../../../src/reducers/components/plugins/menu';

import {
    resetLastUpdate
} from './../../../../src/util/lastUpdate';
import { Menu as MenuRecord } from './../../../../src/records';
import { testState } from './../../../testUtils';

describe('The menu reducer SHOW_MENU action', () => {
    beforeEach(() => resetLastUpdate());

    it('Should show a menu, hiding the previously opened menu', () => {

        const state = testState({
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
            menu(state, action).get('test-grid')
        ).toEqualImmutable(
            new MenuRecord({
                newId: true,
                lastUpdate: 1
            })
        );

    });

    it('Should show a menu, even if none were open', () => {

        const state = testState();

        const action = {
            type: SHOW_MENU,
            stateKey: 'test-grid',
            id: 'newId'
        };

        expect(
            menu(state, action).get('test-grid')
        ).toEqualImmutable(
            new MenuRecord({
                newId: true,
                lastUpdate: 1
            })
        );

    });

});

describe('The menu reducer HIDE_MENU action', () => {
    beforeEach(() => resetLastUpdate());

    it('Should hide a menu, also hiding the previously opened menu', () => {

        const state = testState({
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
            menu(state, action).get('test-grid')
        ).toEqualImmutable(
            new MenuRecord({
                newId: false,
                lastUpdate: 1
            })
        );

    });

    it('Should show a menu, even if none were open', () => {

        const state = testState();

        const action = {
            type: HIDE_MENU,
            stateKey: 'test-grid',
            id: 'newId'
        };

        expect(
            menu(state, action).get('test-grid')
        ).toEqualImmutable(
            new MenuRecord({
                newId: false,
                lastUpdate: 1
            })
        );

    });

});
