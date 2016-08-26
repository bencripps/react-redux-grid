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
        ).toEqual(9);
    });

    it('Should export all reducers', () => {
        expect(
            reducerList.indexOf('bulkAction')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('dataSource')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('editor')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('errorHandler')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('grid')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('loader')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('menu')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('pager')
        ).toNotEqual(-1);

        expect(
            reducerList.indexOf('selection')
        ).toNotEqual(-1);
    });

});
