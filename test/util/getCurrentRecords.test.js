import expect from 'expect';
import { fromJS } from 'immutable';
import { getCurrentRecords } from './../../src/util/getCurrentRecords';
import { DataSource } from './../../src/records';

describe('getCurrentRecords utility function', () => {

    const dataSource = new DataSource({
        data: fromJS([
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
        ])
    });

    it('Should return the correct page size', () => {
        expect(getCurrentRecords(dataSource, 0, 5).data.count()).toEqual(5);
        expect(getCurrentRecords(dataSource, 0, 7).data.count()).toEqual(7);
        expect(getCurrentRecords(dataSource, 0, 2).data.count()).toEqual(2);
    });

    it('Should return empty object if no dataSource is provided', () => {
        expect(getCurrentRecords(false, 0, 5))
            .toEqual({});
    });

    it('Should return props based on infinite scroll', () => {
        expect(
            getCurrentRecords(
                new DataSource({
                    currentRecords: dataSource.data, data: dataSource.data
                }),
                0,
                5,
                true,
                5,
                5,
                1
            )).toEqual({
            data: fromJS([
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
            ]),
            endIndex: 11,
            startIndex: 0
        });
    });

});
