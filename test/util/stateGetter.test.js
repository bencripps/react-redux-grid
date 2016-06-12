import expect from 'expect';
import { fromJS } from 'immutable';
import { stateGetter } from './../../src/util/stateGetter';

describe('State Getter Function', () => {

    // sample redux wrapper for state.get
    function getState(...props) {
        return true;
    }

    function getStateWithImmutable(...props) {
        return fromJS({
            x: 1
        });
    }

    it('Should return state if its registered', () => {
        const state = { filterState: { get: getState } };
        const props = {};
        expect(
            stateGetter(state, props, 'filterState', 'someProp')
        ).toBeTruthy();
    });

    it(['Should return plain object if state is stored as a immutable',
        ' and using a dynamic reducerKey'].join(''), () => {
        const state = { someFilterState: { get: getStateWithImmutable } };
        const props = {
            reducerKeys: {
                filterState: 'someFilterState'
            }
        };

        expect(
            stateGetter(state, props, 'someFilterState', 'someProp')
        ).toEqual({
            x: 1
        });
    });

    it('Should return plain object if state is stored as a immutable', () => {
        const state = { filterState: { get: getStateWithImmutable } };
        const props = {};
        expect(
            stateGetter(state, props, 'filterState', 'someProp')
        ).toEqual({
            x: 1
        });
    });

    it('Should return state even if the casing is off', () => {
        const state = { filterState: { get: getState } };
        const props = {};

        expect(stateGetter(
            state, props, 'filterstate', 'someProp')
        ).toBeTruthy();
        expect(stateGetter(
            state, props, 'FILTERSTATE', 'someProp')
        ).toBeTruthy();
        expect(stateGetter(
            state, props, 'FilterState', 'someProp')
        ).toBeTruthy();
    });

    it('Should return null if it\'s not registered', () => {
        const state = { filterState: { get: getState } };
        const props = {};
        expect(
            stateGetter(state, props, 'unknownState', 'someProp')
        ).toEqual(null);
    });

    it('Should return state when a dynamic key is used if registerd', () => {
        const state = { someFilterState: { get: getState } };
        const props = {
            reducerKeys: {
                filterState: 'someFilterState'
            }
        };
        expect(
            stateGetter(state, props, 'filterState', 'someProp')
        ).toBeTruthy();
    });

    it('Should return null if a dynamic key is used if not registered', () => {
        const state = {};
        const props = {
            reducerKeys: {
                filterState: 'someFilterState'
            }
        };
        expect(
            stateGetter(state, props, 'filterState', 'someProp')
        ).toEqual(null);
    });

    it('Should return null when no keys and no state are provided', () => {
        const state = {};
        const props = {};
        expect(
            stateGetter(state, props, 'filterState', 'someProp')
        ).toEqual(null);
    });

});