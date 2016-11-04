import expect from 'expect';
import { fromJS } from 'immutable';

import {
    getData,
    nameFromDataIndex,
    getValueFromDataIndexArr,
    setDataAtDataIndex,
    getRowKey,
    setKeysInData
} from './../../src/util/getData';

describe('The getRowKey utility function', () => {

    it('Should default to _key when present', () => {

        const columns = [
            {
                dataIndex: 'hat'
            },
            {
                dataIndex: 'phone'
            }
        ];

        const row = fromJS({
            hat: 'hattt',
            phone: '123',
            _key: 'row-0'
        });

        expect(
            getRowKey(columns, row)
        ).toEqual('row-0');

    });

    it('Should return the value when unique prop is declared', () => {

        const columns = [
            {
                dataIndex: 'hat',
                createKeyFrom: true
            },
            {
                dataIndex: 'phone'
            }
        ];

        const row = fromJS({
            hat: 'hattt',
            phone: '123'
        });

        expect(
            getRowKey(columns, row)
        ).toEqual('hattt');

    });

    it('Should work with a suffix', () => {

        const columns = [
            {
                dataIndex: 'hat',
                createKeyFrom: true
            },
            {
                dataIndex: 'phone'
            }
        ];

        const row = fromJS({
            hat: 'hattt',
            phone: '123'
        });

        expect(
            getRowKey(columns, row, 'suffix')
        ).toEqual('hattt-suffix');

    });

    it('Should throw an error if two cols declare createKeyFrom', () => {

        const columns = [
            {
                dataIndex: 'hat',
                createKeyFrom: true
            },
            {
                dataIndex: 'phone',
                createKeyFrom: true
            }
        ];

        const row = fromJS({
            hat: 'hattt',
            phone: '123'
        });

        expect(() => {
            getRowKey(columns, row);
        }).toThrow('Only one column can declare createKeyFrom');

    });

});

describe('nameFromDataIndex utility function', () => {

    it('Should work with a dataIndex', () => {

        const column = {
            dataIndex: 'someIndex',
            name: 'A thing'
        };

        expect(
            nameFromDataIndex(column)
        ).toEqual(
            'someIndex'
        );

    });

    it('Should return empty string if no col is passed', () => {

        const column = null;

        expect(
            nameFromDataIndex(column)
        ).toEqual(
            ''
        );

    });

    it('Should work with a name', () => {

        const column = {
            name: 'A thing'
        };

        expect(
            nameFromDataIndex(column)
        ).toEqual(
            'aThing'
        );

    });

    it('Should work with a string-array', () => {

        const column = {
            name: 'A thing',
            dataIndex: ['some', 'nested', 'value']
        };

        expect(
            nameFromDataIndex(column)
        ).toEqual(
            'value'
        );

    });

});

describe('getData utility function', () => {

    it('Should return undefined if no column is present', () => {

        const row = fromJS({
            col1: 'banana',
            col2: 'orange',
            col3: 'apple'
        });

        const columns = [
            {
                name: 'fruit',
                dataIndex: 'col1'
            },
            {
                name: 'another fruit',
                dataIndex: 'col2'
            },
            {
                name: 'yet another fruit',
                dataIndex: 'col3'
            }
        ];

        const colIndex = 3;

        expect(
            getData(row, columns, colIndex)
        ).toEqual(
            undefined
        );

    });

    it('Should return data from editorState if avail', () => {

        const row = fromJS({
            col1: 'banana',
            col2: 'orange',
            col3: 'apple'
        });

        const columns = [
            {
                name: 'fruit',
                dataIndex: 'col1'
            },
            {
                name: 'another fruit',
                dataIndex: 'col2'
            },
            {
                name: 'yet another fruit',
                dataIndex: 'col3'
            }
        ];

        const colIndex = 2;

        const editorValues = fromJS({
            col3: 'value from editor state'
        });

        expect(getData(row, columns, colIndex, editorValues))
            .toEqual('value from editor state');

    });

    it('Should return data from state even if editor state is avail', () => {

        const row = fromJS({
            col1: 'banana',
            col2: 'orange',
            col3: 'apple'
        });

        const columns = [
            {
                name: 'fruit',
                dataIndex: 'col1'
            },
            {
                name: 'another fruit',
                dataIndex: 'col2'
            },
            {
                name: 'yet another fruit',
                dataIndex: 'col3'
            }
        ];

        const colIndex = 2;

        const editorValues = {
            col2: 'someVal',
            col3: undefined
        };

        expect(getData(row, columns, colIndex, editorValues))
            .toEqual('apple');

    });

    it('Should throw an error if no dataIndex is defined', () => {

        const rowData = {
            col1: 'banana',
            col2: 'orange',
            col3: 'apple'
        };

        const columns = [
            {
                name: 'fruit',
                dataIndex: 'col1'
            },
            {
                name: 'another fruit'
            },
            {
                name: 'yet another fruit',
                dataIndex: 'col3'
            }
        ];

        const colIndex = 1;

        expect(() => {
            getData(rowData, columns, colIndex);
        }).toThrow('No dataIndex found on column', columns[colIndex]);

    });

    it('Should fetch data with a string key', () => {

        const row = fromJS({
            col1: 'banana',
            col2: 'orange',
            col3: 'apple'
        });

        const columns = [
            {
                name: 'fruit',
                dataIndex: 'col1'
            },
            {
                name: 'another fruit',
                dataIndex: 'col2'
            },
            {
                name: 'yet another fruit',
                dataIndex: 'col3'
            }
        ];

        const colIndex = 1;

        expect(getData(
            row,
            columns,
            colIndex
        )).toEqual(
            'orange'
        );

    });

    it('Should fetch data with a string-array key', () => {

        const row = fromJS({
            col1: {
                innerKey: 'inner orange'
            },
            col2: 'orange',
            col3: 'apple'
        });

        const columns = [
            {
                name: 'fruit',
                dataIndex: ['col1', 'innerKey']
            },
            {
                name: 'another fruit',
                dataIndex: 'col2'
            },
            {
                name: 'yet another fruit',
                dataIndex: 'col3'
            }
        ];

        const colIndex = 0;

        expect(getData(
            row,
            columns,
            colIndex
        )).toEqual(
            'inner orange'
        );

    });

    it('Should return empty string if string-array isnt valid', () => {

        const row = fromJS({
            col1: {
                innerKey: 'inner orange'
            },
            col2: 'orange',
            col3: 'apple'
        });

        const columns = [
            {
                name: 'fruit',
                dataIndex: ['col1', 'fakeKey']
            },
            {
                name: 'another fruit',
                dataIndex: 'col2'
            },
            {
                name: 'yet another fruit',
                dataIndex: 'col3'
            }
        ];

        const colIndex = 0;

        expect(getData(
            row,
            columns,
            colIndex
        )).toEqual('');

    });
});

describe('setDataAtDataIndex function', () => {

    it('Should work with nested object', () => {

        const row = fromJS({
            outer: {
                inner: 'oldValue'
            }
        });

        expect(
            setDataAtDataIndex(
                row,
                ['outer', 'inner'],
                'newValue'
            )
        ).toEqual(fromJS({
            outer: {
                inner: 'newValue'
            }
        }));
    });

    it('Should throw an error if an invalid key path is passed', () => {

        const row = fromJS({
            'new': {
                thing: 'oldValue'
            }
        });

        expect(() => {
            setDataAtDataIndex(
                row,
                ['new', 'invalidKey'],
                'newValue'
            );
        }).toThrow('Invalid key path');
    });

    it('Should work with a string', () => {

        const flatValues = fromJS({
            val: 1
        });

        expect(
            setDataAtDataIndex(
                flatValues,
                'val',
                'newValue'
            )
        ).toEqual(fromJS({
            val: 'newValue'
        }));
    });

});

describe('getData utilities - setKeysInData function', () => {

    it('Should return the same data if a list with keys is present', () => {

        expect(setKeysInData(
            fromJS(
                [{ dataIndex: 'key', _key: 'row-0' }]
            )
        )).toEqual(fromJS(
            [{ dataIndex: 'key', _key: 'row-0' }]
        ));

    });

    it('Should set keys in a list', () => {

        expect(setKeysInData(
            fromJS(
                [
                    { dataIndex: 'key' },
                    { dataIndex: 'key' }
                ]
            )
        )).toEqual(fromJS(
            [
                { dataIndex: 'key', _key: 'row-0' },
                { dataIndex: 'key', _key: 'row-1' }
            ]
        ));

    });

    it('Should set keys in an array', () => {

        expect(setKeysInData([
            { dataIndex: 'key' },
            { dataIndex: 'key' }
        ])).toEqual(fromJS(
            [
                { dataIndex: 'key', _key: 'row-0' },
                { dataIndex: 'key', _key: 'row-1' }
            ]
        ));

    });

    it('Should return an array with keys as immutable', () => {
        expect(setKeysInData([
                { dataIndex: 'key', _key: 'row-0' },
                { dataIndex: 'key', _key: 'row-1' }
        ])).toEqual(fromJS(
            [
                { dataIndex: 'key', _key: 'row-0' },
                { dataIndex: 'key', _key: 'row-1' }
            ]
        ));
    });

    it('Should return an empty list if not arg is passed', () => {
        expect(setKeysInData())
            .toEqual(fromJS([]));
    });

});

describe('getValueFromDataIndexArr function', () => {

    it('Should work with a nested object', () => {

        const row = fromJS({
            outer: {
                inner: {
                    superInner: {
                        value: 'x'
                    }
                }
            }
        });

        expect(
            getValueFromDataIndexArr(
                row,
                ['outer', 'inner', 'superInner', 'value']
            )
        ).toEqual('x');
    });

    it('Should return empty string if the keys are invalid', () => {

        const row = fromJS({
            outer: {
                inner: {
                    superInner: {
                        value: 'x'
                    }
                }
            }
        });

        expect(getValueFromDataIndexArr(
            row,
            ['outer', 'inner', 'fake', 'value']
        )).toEqual('');
    });

});
