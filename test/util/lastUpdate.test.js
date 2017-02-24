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
            grid: 6,
            loader: 7,
            menu: 8,
            pager: 9,
            selection: 10
        });
    });

    it('Should getLastupdate provide statemap when state is immutable', () => {
        const store = {
            getState: () => (fromJS({
                bulkaction: { 'test-grid-1': { lastUpdate: 1 } },
                dataSource: { 'test-grid-1': { lastUpdate: 2 } },
                editor: { 'test-grid-1': { lastUpdate: 3 } },
                errorhandler: { 'test-grid-1': { lastUpdate: 4 } },
                grid: { 'test-grid-1': { lastUpdate: 6 } },
                loader: { 'test-grid-1': { lastUpdate: 7 } },
                menu: { 'test-grid-1': { lastUpdate: 8 } },
                pager: { 'test-grid-1': { lastUpdate: 9 } },
                selection: { 'test-grid-1': { lastUpdate: 10 }}
            }))
        };

        expect(
            getLastUpdate(store, 'test-grid-1')
        ).toEqual({
            bulkaction: 1,
            dataSource: 2,
            editor: 3,
            errorhandler: 4,
            grid: 6,
            loader: 7,
            menu: 8,
            pager: 9,
            selection: 10
        });
    });

    it('Should be able to pass reducerKeys to getLastupdate', () => {
        const store = {
            getState: () => (fromJS({
                'redux-grid-bulkaction': { 'test-grid-1': { lastUpdate: 1 } },
                'redux-grid-datasource': { 'test-grid-1': { lastUpdate: 2 } },
                'redux-grid-editor': { 'test-grid-1': { lastUpdate: 3 } },
                'redux-grid-errorhandler': { 'test-grid-1': { lastUpdate: 4 } },
                'redux-grid': { 'test-grid-1': { lastUpdate: 6 } },
                'redux-grid-loader': { 'test-grid-1': { lastUpdate: 7 } },
                'redux-grid-menu': { 'test-grid-1': { lastUpdate: 8 } },
                'redux-grid-pager': { 'test-grid-1': { lastUpdate: 9 } },
                'redux-grid-selectionmodel': {
                    'test-grid-1': { lastUpdate: 10 }
                }
            }))
        };

        const reducerKeys = {
            bulkaction: 'redux-grid-bulkaction',
            dataSource: 'redux-grid-datasource',
            editor: 'redux-grid-editor',
            errorhandler: 'redux-grid-errorhandler',
            grid: 'redux-grid',
            loader: 'redux-grid-loader',
            menu: 'redux-grid-menu',
            pager: 'redux-grid-pager',
            selection: 'redux-grid-selectionmodel'
        };

        expect(
            getLastUpdate(store, 'test-grid-1', reducerKeys)
        ).toEqual({
            'redux-grid-bulkaction': 1,
            'redux-grid-datasource': 2,
            'redux-grid-editor': 3,
            'redux-grid-errorhandler': 4,
            'redux-grid': 6,
            'redux-grid-loader': 7,
            'redux-grid-menu': 8,
            'redux-grid-pager': 9,
            'redux-grid-selectionmodel': 10
        });
    });

    it('Should be able to use nested reducers with getLastUpdate', () => {
        const store = {
            getState: () => (fromJS({
                nested: {
                    grid: { lastUpdate: 6 }
                }
            }))
        };

        const reducerKeys = 'nested';

        expect(
            getLastUpdate(store, 'grid', reducerKeys)
        ).toEqual({
            nested: {
                grid: 6
            }
        });
    });
});
