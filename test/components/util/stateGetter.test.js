import expect from 'expect';
import { stateGetter } from './../../../src/util/stateGetter';

describe('State Getter Function', () => {

    // sample redux wrapper for state.get
    function getState(...props) {
        return true;
    }

    it('Should return state if its there', () => {
        const state = { filterState: { get: getState } };
        expect(stateGetter(state, 'filterState', 'someProp')).toBeTruthy();
    });

    it('Should return null if its there', () => {
        const state = { filterState: { get: getState } };
        expect(stateGetter(state, 'unknownState', 'someProp')).toEqual(null);
    });

});