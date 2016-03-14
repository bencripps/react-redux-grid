import * as imports from './../src/';
import expect from 'expect';

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
        expect(Object.keys(imports.Reducers).length).toEqual(10);
    });

    it('Should export a DataSource Reducer', () =>{
        reducerTest('DataSource');
    });

    it('Should export a Grid Reducer', () =>{
        reducerTest('Grid');
    });

    it('Should export a BulkActions Reducer', () =>{
        reducerTest('BulkActions');
    });

    it('Should export a Editor Reducer', () =>{
        reducerTest('Editor');
    });

    it('Should export a ErrorHandler Reducer', () =>{
        reducerTest('ErrorHandler');
    });

    it('Should export a Filter Reducer', () =>{
        reducerTest('Filter');
    });

    it('Should export a Loader Reducer', () =>{
        reducerTest('Loader');
    });

    it('Should export a Menu Reducer', () =>{
        reducerTest('Menu');
    });

    it('Should export a Pager Reducer', () =>{
        reducerTest('Pager');
    });

    it('Should export a Selection Reducer', () =>{
        reducerTest('Selection');
    });

});

describe('Combined Root Reducer Export', () =>{

    it('Should export a root Reducer', () =>{
        expect(imports.GridRootReducer).toBeTruthy();
        expect(typeof imports.GridRootReducer).toEqual('function');
    });

});