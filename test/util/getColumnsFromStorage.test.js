/* eslint-enable describe it sinon */
import expect from 'expect';

import {
    getColumnsFromStorage
} from './../../src/util/getColumnsFromStorage';

describe('the getColumnsFromStorage utility', () => {

    it('Should map width, order, and hidden only', () => {

        const storageCoumns = [
            {
                sortDirection: null,
                className: 'additional-class',
                width: '40%',
                dataIndex: ['person', 'name'],
                hidden: true,
                name: 'Name',
                expandable: true,
                sortable: true,
                id: 'TmFtZWdyaWQtY29sdW1u'
            },
            {
                name: 'Phone Number',
                dataIndex: 'Phone Number',
                sortable: true,
                className: 'additional-class',
                id: 'UGhvbmUgTnVtYmVyZ3JpZC1jb2x1bW4=',
                sortDirection: null
            },
            {
                name: 'Email',
                dataIndex: 'Email',
                sortable: true,
                className: 'additional-class',
                defaultSortDirection: 'descend',
                id: 'RW1haWxncmlkLWNvbHVtbg==',
                sortDirection: null
            },
            {
                name: 'Address',
                dataIndex: 'Address',
                sortable: true,
                className: 'additional-class',
                id: 'QWRkcmVzc2dyaWQtY29sdW1u',
                sortDirection: 'DESC'
            }
        ];

        const propColumns = [
            {
                name: 'Phone Number',
                dataIndex: 'Phone Number',
                sortable: true,
                className: 'additional-class'
            },
            {
                className: 'additional-class',
                width: '45%',
                dataIndex: ['person', 'name'],
                hidden: false,
                name: 'Name',
                expandable: true,
                sortable: true,
                renderer: () => {}
            },
            {
                name: 'Email',
                dataIndex: 'Email',
                sortable: true,
                className: 'additional-class',
                defaultSortDirection: 'descend'
            },
            {
                name: 'Address',
                dataIndex: 'Address',
                sortable: true,
                className: 'additional-class'
            }
        ];

        const result = [
            {
                className: 'additional-class',
                width: '40%',
                dataIndex: ['person', 'name'],
                hidden: true,
                name: 'Name',
                expandable: true,
                sortable: true,
                renderer: () => {}
            },
            {
                name: 'Phone Number',
                dataIndex: 'Phone Number',
                sortable: true,
                className: 'additional-class'
            },
            {
                name: 'Email',
                dataIndex: 'Email',
                sortable: true,
                className: 'additional-class',
                defaultSortDirection: 'descend'
            },
            {
                name: 'Address',
                dataIndex: 'Address',
                sortable: true,
                className: 'additional-class'
            }
        ];

        expect(
            getColumnsFromStorage(storageCoumns, propColumns)
        ).toEqual(result);

    });

    it('Should map over a missing column', () => {

        const storageCoumns = [
            {
                sortDirection: null,
                className: 'additional-class',
                width: '40%',
                dataIndex: ['person', 'name'],
                hidden: true,
                name: 'Name',
                expandable: true,
                sortable: true,
                id: 'TmFtZWdyaWQtY29sdW1u'
            },
            {
                name: 'Phone Number',
                dataIndex: 'Phone Number',
                sortable: true,
                className: 'additional-class',
                id: 'UGhvbmUgTnVtYmVyZ3JpZC1jb2x1bW4=',
                sortDirection: null
            },
            {
                name: 'Email',
                dataIndex: 'Email',
                sortable: true,
                className: 'additional-class',
                defaultSortDirection: 'descend',
                id: 'RW1haWxncmlkLWNvbHVtbg==',
                sortDirection: null
            },
            {
                name: 'Address',
                dataIndex: 'Address',
                sortable: true,
                className: 'additional-class',
                id: 'QWRkcmVzc2dyaWQtY29sdW1u',
                sortDirection: 'DESC'
            }
        ];

        const propColumns = [
            {
                name: 'Phone Number',
                dataIndex: 'Phone Number',
                sortable: true,
                className: 'additional-class'
            },
            {
                name: 'New Column',
                dataIndex: 'newColumn'
            },
            {
                name: 'New Column Again',
                dataIndex: ['new', 'column']
            },
            {
                className: 'additional-class',
                width: '45%',
                dataIndex: ['person', 'name'],
                hidden: false,
                name: 'Name',
                expandable: true,
                sortable: true,
                renderer: () => {}
            },
            {
                name: 'Email',
                dataIndex: 'Email',
                sortable: true,
                className: 'additional-class',
                defaultSortDirection: 'descend'
            },
            {
                name: 'Address',
                dataIndex: 'Address',
                sortable: true,
                className: 'additional-class'
            }
        ];

        const result = [
            {
                name: 'New Column',
                dataIndex: 'newColumn'
            },
            {
                name: 'New Column Again',
                dataIndex: ['new', 'column']
            },
            {
                className: 'additional-class',
                width: '40%',
                dataIndex: ['person', 'name'],
                hidden: true,
                name: 'Name',
                expandable: true,
                sortable: true,
                renderer: () => {}
            },
            {
                name: 'Phone Number',
                dataIndex: 'Phone Number',
                sortable: true,
                className: 'additional-class'
            },
            {
                name: 'Email',
                dataIndex: 'Email',
                sortable: true,
                className: 'additional-class',
                defaultSortDirection: 'descend'
            },
            {
                name: 'Address',
                dataIndex: 'Address',
                sortable: true,
                className: 'additional-class'
            }
        ];

        expect(
            getColumnsFromStorage(storageCoumns, propColumns)
        ).toEqual(result);

    });

    it('Should map over a column when dataIndex has changed', () => {

        const storageCoumns = [
            {
                sortDirection: null,
                className: 'additional-class',
                width: '40%',
                dataIndex: ['person', 'name'],
                hidden: true,
                name: 'Name',
                expandable: true,
                sortable: true,
                id: 'TmFtZWdyaWQtY29sdW1u'
            },
            {
                name: 'Phone Number',
                dataIndex: 'Phone Number',
                sortable: true,
                className: 'additional-class',
                id: 'UGhvbmUgTnVtYmVyZ3JpZC1jb2x1bW4=',
                sortDirection: null
            },
            {
                name: 'Email',
                dataIndex: 'Email',
                sortable: true,
                className: 'additional-class',
                defaultSortDirection: 'descend',
                id: 'RW1haWxncmlkLWNvbHVtbg==',
                sortDirection: null
            },
            {
                name: 'Address',
                dataIndex: 'Address',
                sortable: true,
                className: 'additional-class',
                id: 'QWRkcmVzc2dyaWQtY29sdW1u',
                sortDirection: 'DESC'
            }
        ];

        const propColumns = [
            {
                name: 'Phone Number',
                dataIndex: 'Phone Number New',
                sortable: true,
                className: 'additional-class'
            },
            {
                name: 'New Column',
                dataIndex: 'newColumn'
            },
            {
                name: 'New Column Again',
                dataIndex: ['new', 'column']
            },
            {
                className: 'additional-class',
                width: '45%',
                dataIndex: ['person', 'name'],
                hidden: false,
                name: 'Name',
                expandable: true,
                sortable: true,
                renderer: () => {}
            },
            {
                name: 'Email',
                dataIndex: 'Email',
                sortable: true,
                className: 'additional-class',
                defaultSortDirection: 'descend'
            },
            {
                name: 'Address',
                dataIndex: 'Address',
                sortable: true,
                className: 'additional-class'
            }
        ];

        const result = [
            {
                name: 'Phone Number',
                dataIndex: 'Phone Number New',
                sortable: true,
                className: 'additional-class'
            },
            {
                name: 'New Column',
                dataIndex: 'newColumn'
            },
            {
                name: 'New Column Again',
                dataIndex: ['new', 'column']
            },
            {
                className: 'additional-class',
                width: '40%',
                dataIndex: ['person', 'name'],
                hidden: true,
                name: 'Name',
                expandable: true,
                sortable: true,
                renderer: () => {}
            },
            {
                name: 'Email',
                dataIndex: 'Email',
                sortable: true,
                className: 'additional-class',
                defaultSortDirection: 'descend'
            },
            {
                name: 'Address',
                dataIndex: 'Address',
                sortable: true,
                className: 'additional-class'
            }
        ];

        expect(
            getColumnsFromStorage(storageCoumns, propColumns)
        ).toEqual(result);

    });

});
