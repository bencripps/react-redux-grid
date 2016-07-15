/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    SELECT_ALL,
    SET_SELECTION,
    DESELECT_ALL,
    SET_DATA
} from './../../../../src/constants/ActionTypes';

import
    selection,
    { setIndexes }
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

    const state = fromJS({
        'test-grid': {
            fakeRow: true,
            anotherRow: false,
            indexes: [0]
        }
    });

    const action = {
        type: SET_DATA,
        stateKey: 'test-grid'
    };

    it('Should wipe out all previous selections', () => {
        expect(selection(state, action))
            .toEqualImmutable(fromJS({
                'test-grid': {
                    lastUpdate: 1
                }
            }));
    });

});

describe('The setSelection func in the selection reducer', () => {
    beforeEach(() => resetLastUpdate());

    const state = fromJS({
        'test-grid': {
            fakeRow: true,
            anotherRow: false,
            indexes: [0]
        }
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
            selection(state, action)
        ).toEqualImmutable(
            fromJS({
                'test-grid': {
                    anotherRow: true,
                    lastUpdate: 1,
                    indexes: [1]
                }
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
            selection(state, action)
        ).toEqualImmutable(
            fromJS({
                'test-grid': {
                    fakeRow: false,
                    lastUpdate: 1,
                    indexes: []
                }
            })
        );
    });

    it('Should select initial value if none are selected', () => {

        const innerState = fromJS({});

        const action = {
            type: SET_SELECTION,
            stateKey: 'test-grid',
            id: 'fakeRow',
            index: 11
        };

        expect(
            selection(innerState, action)
        ).toEqualImmutable(
            fromJS({
                'test-grid': {
                    fakeRow: true,
                    lastUpdate: 1,
                    indexes: [11]
                }
            })
        );
    });

    it('Should allow multiselect if clearSelections is false', () => {

        const selectedState = fromJS({
            'test-grid': {
                fakeRow: true,
                indexes: [0]
            }
        });

        const action = {
            type: SET_SELECTION,
            stateKey: 'test-grid',
            id: 'anotherRow',
            clearSelections: false,
            index: 1
        };

        expect(
            selection(selectedState, action)
        ).toEqualImmutable(
            fromJS({
                'test-grid': {
                    fakeRow: true,
                    anotherRow: true,
                    indexes: [0, 1],
                    lastUpdate: 1
                }
            })
        );

    });

});
