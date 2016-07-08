import * as imports from './../src/';
import { is } from 'immutable';
import expect from 'expect';
import { diff } from 'deep-diff';

expect.extend({
    toEqualImmutable(expected) {
        expect.assert(
            is(this.actual, expected),
            'Expected \n%s\nto be equivalent to actual \n%s\n Diff: %s',
            expected,
            this.actual,
            diff(
                expected && expected.toJS
                    ? expected.toJS()
                    : expected,
                this.actual && this.actual.toJS
                    ? this.actual.toJS()
                    : this.actual
            )
        );
    }
});

function reducerTest(reducerKey) {
    expect(imports.Reducers[reducerKey]).toBeTruthy();
    expect(typeof imports.Reducers[reducerKey]).toEqual('function');
}

describe('React Redux Grid Exports', () => {

    it('Should export modules', () => {
        expect(imports).toBeTruthy();
    });

    it('Should export 6 modules', () =>{
        expect(Object.keys(imports).length).toEqual(6);
    });

});

describe('Grid Export', () =>{

    it('Should export a Grid', () =>{
        expect(imports.Grid).toBeTruthy();
        expect(typeof imports.Grid).toEqual('function');
    });

});

describe('Store Export', () =>{

    it('Should export a Grid', () =>{
        expect(imports.Store).toBeTruthy();
        expect(typeof imports.Store).toEqual('object');
        expect(imports.Store.dispatch).toBeTruthy();
        expect(typeof imports.Store.dispatch).toEqual('function');
    });

});

describe('Reducers Export', () =>{

    it('Should export all Reducers', () =>{
        expect(imports.Reducers).toBeTruthy();
        expect(typeof imports.Reducers).toEqual('object');
        expect(Object.keys(imports.Reducers).length).toEqual(9);
    });

    it('Should export a DataSource Reducer', () =>{
        reducerTest('dataSource');
    });

    it('Should export a Grid Reducer', () =>{
        reducerTest('grid');
    });

    it('Should export a BulkActions Reducer', () =>{
        reducerTest('bulkAction');
    });

    it('Should export a Editor Reducer', () =>{
        reducerTest('editor');
    });

    it('Should export a ErrorHandler Reducer', () =>{
        reducerTest('errorHandler');
    });

    it('Should export a Loader Reducer', () =>{
        reducerTest('loader');
    });

    it('Should export a Menu Reducer', () =>{
        reducerTest('menu');
    });

    it('Should export a Pager Reducer', () =>{
        reducerTest('pager');
    });

    it('Should export a Selection Reducer', () =>{
        reducerTest('selection');
    });

});

describe('Combined Root Reducer Export', () =>{

    it('Should export a root Reducer', () =>{
        expect(imports.GridRootReducer).toBeTruthy();
        expect(typeof imports.GridRootReducer).toEqual('function');
    });

});
