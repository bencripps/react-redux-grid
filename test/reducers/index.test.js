/* eslint-enable describe it */
import expect from 'expect';

import {
    rootReducer,
    Reducers
} from './../../src/reducers';

describe('Grid reducer exports', () => {

    const reducerList = Object.keys(
        Reducers
    );

    it('Should export a root reducer as a function', () => {
        expect(
            rootReducer
        ).toBeA('function');
    });

    it('Should export a Reducers object', () => {
        expect(
            typeof Reducers
        ).toEqual('object');
    });

    it('Should export a Reducers object', () => {
        expect(
            reducerList.length
        ).toEqual(10);
    });

    it('Should export all reducers', () => {
        expect(
            reducerList.indexOf('BulkActions')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('DataSource')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('Editor')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('ErrorHandler')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('Filter')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('Grid')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('Loader')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('Menu')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('Pager')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('Selection')
        ).toNotEqual(-1);
    });

});