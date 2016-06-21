/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    SELECT_ALL,
    SET_SELECTION,
    DESELECT_ALL
} from './../../../../src/constants/ActionTypes';

import
    selection
from './../../../../src/reducers/components/plugins/selection';

import {
    generateLastUpdate,
    resetLastUpdate
} from './../../../../src/util/lastUpdate';

describe('The selectAll func in the selection reducer', () => {
    beforeEach(() => resetLastUpdate());

    const state = fromJS({
        'test-grid': {
            fakeRow: false,
            anotherRow: false
        }
    });

    const action = {
        type: SELECT_ALL,
        stateKey: 'test-grid',
        selection: {
            fakeRow: true,
            anotherRow: true
        }
    };

    it('Should return all rows as selected', () => {
        expect(
            selection(state, action)
        ).toEqualImmutable(
            fromJS({
                'test-grid': {
                    fakeRow: true,
                    anotherRow: true,
                    lastUpdate: 1
                }
            })
        );
    });

});

describe('The deselectAll func in the selection reducer', () => {
    beforeEach(() => resetLastUpdate());

    const state = fromJS({
        'test-grid': {
            fakeRow: false,
            anotherRow: false
        }
    });

    const action = {
        type: DESELECT_ALL,
        stateKey: 'test-grid'
    };

    it('Should return an empty map upon deselect', () => {
        expect(
            selection(state, action)
        ).toEqualImmutable(
            fromJS({
                'test-grid': { lastUpdate: 1 }
            })
        );
    });

});

describe('The setSelection func in the selection reducer', () => {
    beforeEach(() => resetLastUpdate());

    const state = fromJS({
        'test-grid': {
            fakeRow: true,
            anotherRow: false
        }
    });

    it(['Should should select a value and clear other values, ',
        'and clearSelections is passed'].join(''), () => {

        const action = {
            type: SET_SELECTION,
            stateKey: 'test-grid',
            clearSelections: true,
            id: 'anotherRow'
        };

        expect(
            selection(state, action)
        ).toEqualImmutable(
            fromJS({
                'test-grid': {
                    anotherRow: true,
                    lastUpdate: 1
                }
            })
        );
    });

    it(['Should should deselect a value if already selected, ',
        'and clearSelections is passed'].join(''), () => {

        const action = {
            type: SET_SELECTION,
            stateKey: 'test-grid',
            clearSelections: true,
            allowDeselect: true,
            id: 'fakeRow'
        };

        expect(
            selection(state, action)
        ).toEqualImmutable(
            fromJS({
                'test-grid': {
                    fakeRow: false,
                    lastUpdate: 1
                }
            })
        );
    });

    it('Should select initial value if none are selected', () => {

        const innerState = fromJS({});

        const action = {
            type: SET_SELECTION,
            stateKey: 'test-grid',
            id: 'fakeRow'
        };

        expect(
            selection(innerState, action)
        ).toEqualImmutable(
            fromJS({
                'test-grid': {
                    fakeRow: true,
                    lastUpdate: 1
                }
            })
        );
    });

    it('Should allow multiselect if clearSelections is false', () => {

        const selectedState = fromJS({
            'test-grid': {
                fakeRow: true
            }
        });

        const action = {
            type: SET_SELECTION,
            stateKey: 'test-grid',
            id: 'anotherRow',
            clearSelections: false
        };

        expect(
            selection(selectedState, action)
        ).toEqualImmutable(
            fromJS({
                'test-grid': {
                    fakeRow: true,
                    anotherRow: true,
                    lastUpdate: 1
                }
            })
        );

    });

});