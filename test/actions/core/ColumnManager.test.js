import expect from 'expect';

import {
    SET_COLUMNS
} from './../../../src/constants/ActionTypes';

import {
    reorderColumn
} from './../../../src/actions/core/ColumnManager';

describe('The reorderColumn gridAction', () => {

    it('Should reorder columns correctly', () => {
        const action = {
            draggedIndex: 0,
            droppedIndex: 1,
            columns: [
                {
                    name: 'Col1',
                    dataIndex: 'col1'
                },
                {
                    name: 'Col2',
                    dataIndex: 'col2'
                },
                {
                    name: 'Col3',
                    dataIndex: 'col3'
                }
            ],
            stateKey: 'test-grid'
        };

        expect(reorderColumn(action))
            .toEqual({
                columns: [
                    {
                        name: 'Col2',
                        dataIndex: 'col2'
                    },
                    {
                        name: 'Col1',
                        dataIndex: 'col1'
                    },
                    {
                        name: 'Col3',
                        dataIndex: 'col3'
                    }
                ],
                stateKey: 'test-grid',
                type: SET_COLUMNS
            });
    });

    it('Should keep columns in same order even on drop', () => {
        const action = {
            draggedIndex: 0,
            droppedIndex: 0,
            columns: [
                {
                    name: 'Col1',
                    dataIndex: 'col1'
                },
                {
                    name: 'Col2',
                    dataIndex: 'col2'
                },
                {
                    name: 'Col3',
                    dataIndex: 'col3'
                }
            ],
            stateKey: 'test-grid'
        };

        expect(reorderColumn(action))
            .toEqual({
                columns: [
                    {
                        name: 'Col1',
                        dataIndex: 'col1'
                    },
                    {
                        name: 'Col2',
                        dataIndex: 'col2'
                    },
                    {
                        name: 'Col3',
                        dataIndex: 'col3'
                    }
                ],
                stateKey: 'test-grid',
                type: SET_COLUMNS
            });
    });

});
