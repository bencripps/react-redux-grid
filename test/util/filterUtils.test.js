import expect from 'expect';
import filterUtils from './../../src/util/filterUtils';

describe('filterUtils utility', () => {

    const dataSource = {
        data: [
            {
                name: 'test'
            },
            {
                name: 'ben'
            },
            {
                name: 'benjamin'
            }
        ],
        proxy: [
            {
                name: 'test'
            },
            {
                name: 'ben'
            },
            {
                name: 'benjamin'
            }
        ]
    };

    it('Should return filter by byKeyword with two matches', () => {
        expect(filterUtils.byKeyword('ben', dataSource))
            .toEqual([
                {
                    name: 'ben'
                },
                {
                    name: 'benjamin'
                }
            ]);
    });

    it('Should return filter by byKeyword with a single match', () => {
        expect(filterUtils.byKeyword('test', dataSource))
            .toEqual([
                {
                    name: 'test'
                }
            ]);
    });

    it('Should return correct filter using byMenu', () => {

        expect(filterUtils.byMenu({
            name: 'test'
        }, dataSource))
            .toEqual([
                {
                    name: 'test'
                }
            ]);
    });

    it('Should return correct filter using byMenu when casing is off', () => {

        expect(filterUtils.byMenu({
            name: 'TEST'
        }, dataSource))
            .toEqual([
                {
                    name: 'test'
                }
            ]);

        expect(filterUtils.byMenu({
            name: 'TeSt'
        }, dataSource))
            .toEqual([
                {
                    name: 'test'
                }
            ]);
    });

    it('Should return proxy if no filter is passed', () => {

        expect(filterUtils.byMenu(null, dataSource))
            .toEqual([
                {
                    name: 'test'
                },
                {
                    name: 'ben'
                },
                {
                    name: 'benjamin'
                }
            ]);
    });
});
