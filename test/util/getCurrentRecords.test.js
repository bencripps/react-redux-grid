import expect from 'expect';
import { getCurrentRecords } from './../../src/util/getCurrentRecords';

describe('getCurrentRecords utility function', () => {

    const dataSource = {
        data: [
            {
                test: 'test'
            },
            {
                test: 'test'
            },
            {
                test: 'test'
            },
            {
                test: 'test'
            },
            {
                test: 'test'
            },
            {
                test: 'test'
            },
            {
                test: 'test'
            },
            {
                test: 'test'
            },
            {
                test: 'test'
            },
            {
                test: 'test'
            },
            {
                test: 'test'
            }
        ]
    };

    it('Should return the correct page size', () => {
        expect(getCurrentRecords(dataSource, 0, 5).data.length).toEqual(5);
        expect(getCurrentRecords(dataSource, 0, 7).data.length).toEqual(7);
        expect(getCurrentRecords(dataSource, 0, 2).data.length).toEqual(2);
    });

    it('Should return empty object if no dataSource is provided', () => {
        expect(getCurrentRecords(false, 0, 5))
            .toEqual({});
    });

    it('Should return props based on infinite scroll', () => {
        expect(
            getCurrentRecords(
                { currentRecords: dataSource.data, data: dataSource.data },
                0,
                5,
                true,
                5,
                5,
                1
            )).toEqual({
                data: [
                    {
                        test: 'test'
                    },
                    {
                        test: 'test'
                    },
                    {
                        test: 'test'
                    },
                    {
                        test: 'test'
                    },
                    {
                        test: 'test'
                    },
                    {
                        test: 'test'
                    },
                    {
                        test: 'test'
                    },
                    {
                        test: 'test'
                    },
                    {
                        test: 'test'
                    },
                    {
                        test: 'test'
                    },
                    {
                        test: 'test'
                    }
                ],
                endIndex: 11,
                startIndex: 0
            });
    });

});
