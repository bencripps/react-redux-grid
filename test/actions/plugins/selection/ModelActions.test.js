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
                    { name: 'ben' },
                    { name: 'ben2'}
                ]
            },
            stateKey: 'test-grid'
        };

        expect(selectAll(action))
            .toEqual({
                type: SELECT_ALL,
                selection: { 'cm93MA==': true, 'cm93MQ==': true },
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
            stateKey: 'test-grid'
        };

        expect(setSelection(action))
            .toEqual({
                allowDeselect: true,
                clearSelections: true,
                id: 'col1',
                stateKey: 'test-grid',
                type: SET_SELECTION
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
            stateKey: 'test-grid'
        };

        expect(setSelection(action))
            .toEqual({
                allowDeselect: false,
                id: 'col1',
                stateKey: 'test-grid',
                type: SET_SELECTION
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
            stateKey: 'test-grid'
        };

        expect(setSelection(action))
            .toEqual({
                allowDeselect: true,
                clearSelections: true,
                id: 'col1',
                stateKey: 'test-grid',
                type: SET_SELECTION
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
            stateKey: 'test-grid'
        };

        expect(setSelection(action))
            .toEqual({
                allowDeselect: true,
                clearSelections: true,
                id: 'col1',
                stateKey: 'test-grid',
                type: SET_SELECTION
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
            stateKey: 'test-grid'
        };

        expect(setSelection(action))
            .toEqual({
                allowDeselect: true,
                id: 'col1',
                stateKey: 'test-grid',
                type: 'SET_SELECTION'
            });
    });
});

