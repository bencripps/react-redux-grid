import expect from 'expect';
import { fromJS } from 'immutable';

import {
    generateLastUpdate,
    getLastUpdate,
    resetLastUpdate
} from './../../src/util/lastUpdate';

describe('LastUpdate utility', () => {

    it('Should generateLastUpdate with a incrementing number', () => {
        const first = generateLastUpdate();
        const second = generateLastUpdate();

        expect(
            first
        ).toBeA('number');

        expect(
            second
        ).toBeA('number');

        expect(
            first < second
        ).toBe(true);
    });

    it('Should resetLastUdate where next generate will return 1', () => {
        resetLastUpdate();

        expect(
            generateLastUpdate()
        ).toBe(1);

        expect(
            generateLastUpdate()
        ).toBe(2);

        resetLastUpdate();

        expect(
            generateLastUpdate()
        ).toBe(1);

        expect(
            generateLastUpdate()
        ).toBe(2);
    });

    it('Should getLastupdate and provide a map of reducers lastUpdate', () => {
        const store = {
            getState: () => ({
                bulkaction: fromJS({ 'test-grid-1': { lastUpdate: 1 } }),
                dataSource: fromJS({ 'test-grid-1': { lastUpdate: 2 } }),
                editor: fromJS({ 'test-grid-1': { lastUpdate: 3 } }),
                errorhandler: fromJS({ 'test-grid-1': { lastUpdate: 4 } }),
                filter: fromJS({ 'test-grid-1': { lastUpdate: 5 } }),
                grid: fromJS({ 'test-grid-1': { lastUpdate: 6 } }),
                loader: fromJS({ 'test-grid-1': { lastUpdate: 7 } }),
                menu: fromJS({ 'test-grid-1': { lastUpdate: 8 } }),
                pager: fromJS({ 'test-grid-1': { lastUpdate: 9 } }),
                selection: fromJS({ 'test-grid-1': { lastUpdate: 10 } })
            })
        };

        expect(
            getLastUpdate(store, 'test-grid-1')
        ).toEqual({
            bulkaction: 1,
            dataSource: 2,
            editor: 3,
            errorhandler: 4,
            filter: 5,
            grid: 6,
            loader: 7,
            menu: 8,
            pager: 9,
            selection: 10
        });
    });

});