import expect from 'expect';

import {
    SET_SELECTION,
    SELECT_ALL,
    DESELECT_ALL,
    NO_EVENT
} from './../../../../src/constants/ActionTypes';

import { SELECTION_MODES } from './../../../../src/constants/GridConstants';

import {
    selectAll,
    deselectAll,
    setSelection
} from './../../../../src/actions/plugins/selection/ModelActions';

describe('The grid selectAll Action', () => {

    it('Should select two rows', () => {

        const action = {
            type: SELECT_ALL,
            data: {
                currentRecords: [
                    { name: 'ben', _key: 'row-0' },
                    { name: 'ben2', _key: 'row-1' }
                ]
            },
            stateKey: 'test-grid'
        };

        expect(selectAll(action))
            .toEqual({
                type: SELECT_ALL,
                selection: { 'row-0': true, 'row-1': true },
                stateKey: 'test-grid'
            });

    });

});

describe('The grid deselectAll Action', () => {

    it('Should return the deselect description', () => {

        const action = {
            type: DESELECT_ALL,
            stateKey: 'test-grid'
        };

        expect(deselectAll(action))
            .toEqual({
                type: DESELECT_ALL,
                stateKey: 'test-grid'
            });

    });

});

describe('The grid setSelection Action', () => {

    it('Should return NO_EVENT if no selection mode is enabled', () => {

        const action = {
            type: SET_SELECTION,
            defaults: {},
            modes: {}
        };

        expect(setSelection(action))
            .toEqual({
                type: NO_EVENT
            });
    });

    it('Should return description, with clear selections = true', () => {

        const action = {
            type: SET_SELECTION,
            id: 'col1',
            defaults: {
                enabled: true,
                allowDeselect: true,
                mode: SELECTION_MODES.single
            },
            modes: SELECTION_MODES,
            stateKey: 'test-grid',
            index: 4
        };

        expect(setSelection(action))
            .toEqual({
                allowDeselect: true,
                clearSelections: true,
                id: 'col1',
                stateKey: 'test-grid',
                type: SET_SELECTION,
                index: 4
            });
    });

    it(['Should return description, with clear selections = false ',
        'when allowDeselect is false'].join(''), () => {

        const action = {
            type: SET_SELECTION,
            id: 'col1',
            defaults: {
                enabled: true,
                allowDeselect: false,
                mode: SELECTION_MODES.multi
            },
            modes: SELECTION_MODES,
            stateKey: 'test-grid',
            index: 11
        };

        expect(setSelection(action))
            .toEqual({
                allowDeselect: false,
                id: 'col1',
                stateKey: 'test-grid',
                type: SET_SELECTION,
                index: 11
            });
    });

    it(['Should return description, with clear selections = true ',
        'when mode is checkbox single'].join(''), () => {

        const action = {
            type: SET_SELECTION,
            id: 'col1',
            defaults: {
                enabled: true,
                allowDeselect: true,
                mode: SELECTION_MODES.single
            },
            modes: SELECTION_MODES,
            stateKey: 'test-grid',
            index: 9
        };

        expect(setSelection(action))
            .toEqual({
                allowDeselect: true,
                clearSelections: true,
                id: 'col1',
                stateKey: 'test-grid',
                type: SET_SELECTION,
                index: 9
            });
    });

    it(['Should return description, with clear selections = true ',
        'when mode is single'].join(''), () => {

        const action = {
            type: SET_SELECTION,
            id: 'col1',
            defaults: {
                enabled: true,
                allowDeselect: true,
                mode: SELECTION_MODES.checkboxSingle
            },
            modes: SELECTION_MODES,
            stateKey: 'test-grid',
            index: 1
        };

        expect(setSelection(action))
            .toEqual({
                allowDeselect: true,
                clearSelections: true,
                id: 'col1',
                stateKey: 'test-grid',
                type: SET_SELECTION,
                index: 1
            });
    });

    it('Should return description with multi mode', () => {

        const action = {
            type: SET_SELECTION,
            id: 'col1',
            defaults: {
                enabled: true,
                allowDeselect: true,
                mode: SELECTION_MODES.multi
            },
            modes: SELECTION_MODES,
            stateKey: 'test-grid',
            index: 4
        };

        expect(setSelection(action))
            .toEqual({
                allowDeselect: true,
                id: 'col1',
                stateKey: 'test-grid',
                type: 'SET_SELECTION',
                index: 4
            });
    });
});

