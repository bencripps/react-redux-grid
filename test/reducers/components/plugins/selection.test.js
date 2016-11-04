/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    SELECT_ALL,
    SET_SELECTION,
    DESELECT_ALL,
    SET_DATA,
    SELECT_ROW,
    DESELECT_ROW
} from './../../../../src/constants/ActionTypes';

import
    selection
from './../../../../src/reducers/components/plugins/selection';

import {
    Selection
} from './../../../../src/records';

import {
    setIndexes
} from './../../../../src/reducers/actionHelpers/plugins/selection';

import {
    resetLastUpdate
} from './../../../../src/util/lastUpdate';

import { testState } from './../../../testUtils';

describe('The SELECT_ROW func in the selection reducer', () => {
    beforeEach(() => resetLastUpdate());

    const state = testState({
        'test-grid': new Selection({
            'row-1': false,
            'row-2': false
        })
    });

    const action = {
        type: SELECT_ROW,
        stateKey: 'test-grid',
        rowId: 'row-2'
    };

    it('Should select an unselected row', () => {
        expect(
            selection(state, action).get('test-grid')
        ).toEqual(
            new Selection({
                'row-1': false,
                'row-2': true,
                lastUpdate: 1
            })
        );
    });

});

describe('The DESELECT_ROW func in the selection reducer', () => {
    beforeEach(() => resetLastUpdate());

    const state = fromJS({
        'test-grid': {
            'row-1': true,
            'row-2': false
        }
    });

    const action = {
        type: DESELECT_ROW,
        stateKey: 'test-grid',
        rowId: 'row-1'
    };

    it('Should select an unselected row', () => {
        expect(
            selection(state, action)
        ).toEqual(
            fromJS({
                'test-grid': {
                    'row-1': false,
                    'row-2': false,
                    lastUpdate: 1
                }
            })
        );
    });

});

describe('The selectAll func in the selection reducer', () => {
    beforeEach(() => resetLastUpdate());

    const state = testState({
        'test-grid': new Selection({
            fakeRow: false,
            anotherRow: false
        })
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
            selection(state, action).get('test-grid')
        ).toEqual(
            new Selection({
                fakeRow: true,
                anotherRow: true,
                lastUpdate: 1
            })
        );
    });

});

describe('The deselectAll func in the selection reducer', () => {
    beforeEach(() => resetLastUpdate());

    const state = testState({
        'test-grid': new Selection({
            fakeRow: false,
            anotherRow: false
        })
    });

    const action = {
        type: DESELECT_ALL,
        stateKey: 'test-grid'
    };

    it('Should return an empty map upon deselect', () => {
        expect(
            selection(state, action).get('test-grid')
        ).toEqual(
            new Selection({ lastUpdate: 1 })
        );
    });

});

describe('The setSelection setIndexes tests', () => {

    it('Should set an index if none are present', () => {

        expect(
            setIndexes(1, undefined)
        ).toEqual([
            1
        ]);

    });

    it('Should not set duplicate index', () => {

        expect(
            setIndexes(1, [1])
        ).toEqual([
            1
        ]);

    });

    it(['Should not set duplicate index,',
        'but be able to add array values'].join(' '), () => {

        expect(
            setIndexes([1, 2], [1])
        ).toEqual([
            1, 2
        ]);

    });

    it('Should not set duplicate index even if they are passed', () => {

        expect(
            setIndexes([1, 2, 3, 4, 4], [1])
        ).toEqual([
            1, 2, 3, 4
        ]);

    });

    it('Should remove a value', () => {

        expect(
            setIndexes(1, [1], true)
        ).toEqual([]);

    });

    it('Should remove multiple values', () => {

        expect(
            setIndexes([1, 2], [1, 2, 3], true)
        ).toEqual([3]);

    });

    it('Should remove multiple values, and return empty arr', () => {

        expect(
            setIndexes([1, 2], [1, 2, 3], true)
        ).toEqual([3]);

    });
});

describe('The SET_DATA action in the selection reducer', () => {
    beforeEach(() => resetLastUpdate());

    const state = testState({
        'test-grid': new Selection({
            fakeRow: true,
            anotherRow: false,
            indexes: [0]
        })
    });

    const action = {
        type: SET_DATA,
        stateKey: 'test-grid'
    };

    it('Should wipe out all previous selections', () => {
        expect(selection(state, action).get('test-grid'))
            .toEqual(
                new Selection({
                    lastUpdate: 1
                })
            );
    });

});

describe('The setSelection func in the selection reducer', () => {
    beforeEach(() => resetLastUpdate());

    const state = testState({
        'test-grid': new Selection({
            fakeRow: true,
            anotherRow: false,
            indexes: [0]
        })
    });

    it(['Should should select a value and clear other values, ',
        'and clearSelections is passed'].join(''), () => {

        const action = {
            type: SET_SELECTION,
            stateKey: 'test-grid',
            clearSelections: true,
            id: 'anotherRow',
            index: 1
        };

        expect(
            selection(state, action).get('test-grid')
        ).toEqual(
            new Selection({
                anotherRow: true,
                indexes: [1],
                lastUpdate: 1
            })
        );
    });

    it(['Should deselect a value if already selected, ',
        'and clearSelections is passed'].join(''), () => {

        const action = {
            type: SET_SELECTION,
            stateKey: 'test-grid',
            clearSelections: true,
            allowDeselect: true,
            id: 'fakeRow',
            index: 1
        };

        expect(
            selection(state, action).get('test-grid')
        ).toEqual(
            new Selection({
                fakeRow: false,
                indexes: [],
                lastUpdate: 1
            })
        );
    });

    it('Should select initial value if none are selected', () => {

        const innerState = testState();

        const action = {
            type: SET_SELECTION,
            stateKey: 'test-grid',
            id: 'fakeRow',
            index: 11
        };

        expect(
            selection(innerState, action).get('test-grid')
        ).toEqual(
            new Selection({
                fakeRow: true,
                indexes: [11],
                lastUpdate: 1
            })
        );
    });

    it('Should allow multiselect if clearSelections is false', () => {

        const selectedState = testState({
            'test-grid': new Selection({
                fakeRow: true,
                indexes: [0]
            })
        });

        const action = {
            type: SET_SELECTION,
            stateKey: 'test-grid',
            id: 'anotherRow',
            clearSelections: false,
            index: 1
        };

        expect(
            selection(selectedState, action).get('test-grid')
        ).toEqual(
            new Selection({
                fakeRow: true,
                indexes: [0, 1],
                anotherRow: true,
                lastUpdate: 1
            })
        );

    });

});
