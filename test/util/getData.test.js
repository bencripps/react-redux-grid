import expect from 'expect';
import {
    getData,
    nameFromDataIndex,
    getValueFromDataIndexArr,
    setDataAtDataIndex
} from './../../src/util/getData';

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
            getData(rowData, columns, colIndex)
        ).toEqual(
            undefined
        );

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
            rowData,
            columns,
            colIndex
        )).toEqual(
            'orange'
        );

    });

    it('Should fetch data with a string-array key', () => {

        const rowData = {
            col1: {
                innerKey: 'inner orange'
            },
            col2: 'orange',
            col3: 'apple'
        };

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
            rowData,
            columns,
            colIndex
        )).toEqual(
            'inner orange'
        );

    });

    it('Should return empty string if string-array isnt valid', () => {

        const rowData = {
            col1: {
                innerKey: 'inner orange'
            },
            col2: 'orange',
            col3: 'apple'
        };

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
            rowData,
            columns,
            colIndex
        )).toEqual('');

    });
});

describe('setDataAtDataIndex function', () => {

    it('Should work with nested object', () => {

        const rowValues = {
            outer: {
                inner: 'oldValue'
            }
        };

        expect(
            setDataAtDataIndex(
                rowValues,
                ['outer', 'inner'],
                'newValue'
            )
        ).toEqual({
            outer: {
                inner: 'newValue'
            }
        });
    });

    it('Should throw an error if an invalid key path is passed', () => {

        const rowValues = {
            'new': {
                thing: 'oldValue'
            }
        };

        expect(() => {
            setDataAtDataIndex(
                rowValues,
                ['new', 'invalidKey'],
                'newValue'
            );
        }).toThrow('Invalid key path');
    });

    it('Should work with a string', () => {

        const flatValues = {
            val: 1
        };

        expect(
            setDataAtDataIndex(
                flatValues,
                'val',
                'newValue'
            )
        ).toEqual({
            val: 'newValue'
        });
    });

});

describe('getValueFromDataIndexArr function', () => {

    it('Should work with a nested object', () => {

        const rowData = {
            outer: {
                inner: {
                    superInner: {
                        value: 'x'
                    }
                }
            }
        };

        expect(
            getValueFromDataIndexArr(
                rowData,
                ['outer', 'inner', 'superInner', 'value']
            )
        ).toEqual('x');
    });

    it('Should return empty string if the keys are invalid', () => {

        const rowData = {
            outer: {
                inner: {
                    superInner: {
                        value: 'x'
                    }
                }
            }
        };

        expect(getValueFromDataIndexArr(
            rowData,
            ['outer', 'inner', 'fake', 'value']
        )).toEqual('');
    });

});
