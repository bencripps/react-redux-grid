import expect from 'expect';
import { fromJS } from 'immutable';

import { SORT_DIRECTIONS } from './../../src/constants/GridConstants';

import sorter, { Sorter } from './../../src/util/sorter';

describe('sorter grid utility', () => {

    it('Should return default sorter', () => {
        expect(sorter).toBeA('object');
    });

    it('Should return a class', () => {
        expect(Sorter).toBeA('function');
    });

    it('Should sort by descending', () => {

        const name = 'name';
        const direction = SORT_DIRECTIONS.DESCEND;
        const dataSource = {
            data: fromJS([
                {
                    name: 'ben'
                },
                {
                    name: 'alfred'
                }
            ])
        };

        expect(
            sorter.sortBy(name, direction, dataSource)
        ).toEqual(fromJS([
            {
                name: 'alfred'
            },
            {
                name: 'ben'
            }
        ]));
    });

    it('Should sort by ascending', () => {

        const name = 'name';
        const direction = SORT_DIRECTIONS.ASCEND;
        const dataSource = {
            data: fromJS([
                {
                    name: 'ben'
                },
                {
                    name: 'alfred'
                }
            ])
        };

        expect(
            sorter.sortBy(name, direction, dataSource)
        ).toEqual(fromJS([
            {
                name: 'ben'
            },
            {
                name: 'alfred'
            }
        ]));
    });

    it('Should sort by ascending by default', () => {

        const name = 'name';
        const direction = null;
        const dataSource = {
            data: fromJS([
                {
                    name: 'alfred'
                },
                {
                    name: 'ben'
                }
            ])
        };

        expect(
            sorter.sortBy(name, direction, dataSource)
        ).toEqual(fromJS([
            {
                name: 'alfred'
            },
            {
                name: 'ben'
            }
        ]));
    });

});

