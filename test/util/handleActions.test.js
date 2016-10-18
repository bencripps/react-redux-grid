import expect from 'expect';
import { fromJS } from 'immutable';

import handleActions from './../../src/util/handleActions';

describe('The handleActions utility', () => {

    const initialState = fromJS({});

    it('Should map an action to an action helper', () => {

        const actionMap = handleActions({
            ['ACTION']: () => { return 'action'; },
            ['ANOTHER_ACTION']: () => {}
        }, initialState);

        expect(
            actionMap(undefined, { type: 'ACTION' })
        ).toEqual('action');

        expect(
            actionMap(undefined, { type: 'ANOTHER_ACTION' })
        ).toEqual(undefined);

    });

    it('Should pass existing state to actions', () => {

        const state = fromJS({
            isLoaded: true
        });

        const actionMap = handleActions({
            ['ACTION']: (s) => { return s.get('isLoaded'); },
            ['ANOTHER_ACTION']: () => {}
        }, initialState);

        expect(
            actionMap(state, { type: 'ACTION' })
        ).toEqual(true);
    });

    it('Should throw and error if action type is undefined', () => {

        const state = fromJS({
            isLoaded: true
        });

        const actionMap = handleActions({
            ['ACTION']: (s) => { return s.get('isLoaded'); },
            ['ANOTHER_ACTION']: () => {}
        }, initialState);

        expect(
            () => { actionMap(state, {}); }
        ).toThrow('handleActions: Action Types should be not be undefined');
    });

    it('Should throw an error if no action is defined', () => {

        const state = fromJS({
            isLoaded: true
        });

        const actionMap = handleActions({
            ['ACTION']: (s) => { return s.get('isLoaded'); },
            ['ANOTHER_ACTION']: () => {}
        }, initialState);

        expect(
            () => { actionMap(state, null); }
        ).toThrow('handleActions: action object should be not be undefined');
    });

    it('Should return existing state if helper is not a function', () => {

        const state = fromJS({
            isLoaded: true
        });

        const actionMap = handleActions({
            ['ACTION']: {}
        }, initialState);

        expect(
            actionMap(state, { type: 'ACTION' })
        ).toEqual(fromJS({isLoaded: true}));
    });

});
