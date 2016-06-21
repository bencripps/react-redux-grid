/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    SET_FILTER_VALUE,
    SHOW_FILTER_MENU,
    SET_FILTER_MENU_VALUES
} from './../../../../src/constants/ActionTypes';

import
    filter
from './../../../../src/reducers/components/plugins/filter';

import {
    generateLastUpdate,
    resetLastUpdate
} from './../../../../src/util/lastUpdate';

describe('The filter reducer SET_FILTER_VALUE action', () => {
    beforeEach(() => resetLastUpdate());

    it('Should set a filter value, maintaining previous reducer state', () => {

        const state = fromJS({
            'test-grid': {
                filterMenuShown: true
            }
        });

        const action = {
            type: SET_FILTER_VALUE,
            stateKey: 'test-grid',
            value: {
                someProp: 'filtering on prop'
            }
        };

        expect(
            filter(state, action)
        ).toEqualImmutable(fromJS({
            'test-grid': {
                filterMenuShown: true,
                filterValue: {
                    someProp: 'filtering on prop'
                },
                lastUpdate: 1
            }
        }));

    });

});

describe('The filter reducer SHOW_FILTER_MENU action', () => {
    beforeEach(() => resetLastUpdate());

    it('Should show filter menu, wiping previous state', () => {

        const state = fromJS({
            'test-grid': {
                filterMenuShown: false,
                blah: 'someVal'
            }
        });

        const action = {
            type: SHOW_FILTER_MENU,
            stateKey: 'test-grid',
            metaData: {
                filterMenuShown: true
            }
        };

        expect(
            filter(state, action)
        ).toEqualImmutable(fromJS({
            'test-grid': {
                filterMenuShown: true,
                lastUpdate: 1
            }
        }));

    });

});

describe('The filter reducer SET_FILTER_MENU_VALUES action', () => {
    beforeEach(() => resetLastUpdate());

    it('Should show filter menu, merging new filter vals with old', () => {

        const state = fromJS({
            'test-grid': {
                filterMenuShown: false,
                filterMenuValues: {
                    someProp: 1,
                    newProp: 2
                }
            }
        });

        const action = {
            type: SET_FILTER_MENU_VALUES,
            stateKey: 'test-grid',
            filter: {
                newProp: 'newVal'
            }
        };

        expect(
            filter(state, action)
        ).toEqualImmutable(fromJS({
            'test-grid': {
                filterMenuShown: true,
                filterMenuValues: {
                    someProp: 1,
                    newProp: 'newVal'
                },
                lastUpdate: 1
            }
        }));

    });

    it('Should show filter menu, setting new filter if none existed', () => {

        const state = fromJS({});

        const action = {
            type: SET_FILTER_MENU_VALUES,
            stateKey: 'test-grid',
            filter: {
                newProp: 'newVal'
            }
        };

        expect(
            filter(state, action)
        ).toEqualImmutable(fromJS({
            'test-grid': {
                filterMenuValues: {
                    newProp: 'newVal'
                },
                filterMenuShown: true,
                lastUpdate: 1
            }
        }));

    });

});
