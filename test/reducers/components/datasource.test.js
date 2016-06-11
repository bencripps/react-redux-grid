/* eslint-enable describe it */
import expect from 'expect';
import { fromJS, List, Map } from 'immutable';

import {
    SET_DATA,
    DISMISS_EDITOR
} from './../../../src/constants/ActionTypes';

import
    dataSource
from './../../../src/reducers/components/datasource';

describe('The grid dataSource reducer setData func', () => {

    it('Should set data with a total', () => {

        const state = fromJS({});

        const action = {
            stateKey: 'test-grid',
            type: SET_DATA,
            total: 2,
            data: [{x: 1}, {x: 2}]
        };

        expect(
            dataSource(state, action).toJS()
        ).toEqual({
            'test-grid': {
                currentRecords: [{ x: 1 }, { x: 2 }],
                data: [{ x: 1 }, { x: 2 }],
                proxy: [{ x: 1 }, { x: 2 }],
                total: 2
            }
        });

    });

    it('Should set data without a total', () => {

        const state = fromJS({});

        const action = {
            stateKey: 'test-grid',
            type: SET_DATA,
            data: [{x: 1}, {x: 2}]
        };

        expect(
            dataSource(state, action).toJS()
        ).toEqual({
            'test-grid': {
                currentRecords: [{ x: 1 }, { x: 2 }],
                data: [{ x: 1 }, { x: 2 }],
                proxy: [{ x: 1 }, { x: 2 }],
                total: 2
            }
        });

    });

    it('Should set currentRecords when they are passed', () => {

        const state = fromJS({});

        const action = {
            stateKey: 'test-grid',
            type: SET_DATA,
            data: [{x: 1}, {x: 2}],
            currentRecords: [
                { banana: 2 }
            ]
        };

        expect(
            dataSource(state, action).toJS()
        ).toEqual({
            'test-grid': {
                currentRecords: [{ banana: 2 }],
                data: [{ x: 1 }, { x: 2 }],
                proxy: [{ x: 1 }, { x: 2 }],
                total: 2
            }
        });

    });

});

describe('The grid dataSource reducer dissmissEditor func', () => {

    it('Should wipe previous values upon dissmiss', () => {

        const state = fromJS({
            'test-grid': {
                proxy: [
                    { cell: 1 },
                    { cell: 2}
                ],
                total: 2
            }
        });

        const action = {
            stateKey: 'test-grid',
            type: DISMISS_EDITOR
        };

        // expect(
        //     dataSource(state, action)
        // ).toEqual(state);
    });
});