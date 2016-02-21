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

    it('Should return the correct set of records', () => {
        expect(getCurrentRecords(dataSource, 0, 5)).toBeTruthy();
    });

    it('Should return the correct page size', () => {
        expect(getCurrentRecords(dataSource, 0, 5).length).toEqual(5);
        expect(getCurrentRecords(dataSource, 0, 7).length).toEqual(7);
        expect(getCurrentRecords(dataSource, 0, 2).length).toEqual(2);
    });

});