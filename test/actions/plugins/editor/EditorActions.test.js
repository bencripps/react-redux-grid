import expect from 'expect';

import {
    ADD_NEW_ROW,
    CANCEL_ROW,
    DISMISS_EDITOR,
    EDIT_ROW,
    EDITOR_VALIDATION,
    ROW_VALUE_CHANGE,
    REMOVE_ROW,
    REPOSITION_EDITOR,
    SAVE_ROW,
    UPDATE_ROW
} from './../../../../src/constants/ActionTypes';

import {
    editRow,
    repositionEditor,
    dismissEditor,
    updateCellValue,
    saveRow,
    cancelRow,
    removeRow,
    setEditorValidation,
    addNewRow,
    updateRow
} from './../../../../src/actions/plugins/editor/EditorActions';

describe('The grid editRow Action', () => {

    it('Should return the correct edit action', () => {

        const action = {
            type: EDIT_ROW,
            rowId: 'uniqueId',
            top: 40,
            rowData: {
                col1: true,
                col2: 'abc'
            },
            rowIndex: 11,
            columns: [
                {
                    name: 'Col1',
                    dataIndex: 'col1'
                },
                {
                    name: 'Col2',
                    dataIndex: 'col2'
                }
            ],
            isCreate: false,
            stateKey: 'test-grid'
        };

        expect(editRow(action))
            .toEqual({
                columns: [
                    {
                        name: 'Col1',
                        dataIndex: 'col1'
                    },
                    {
                        name: 'Col2',
                        dataIndex: 'col2'
                    }
                ],
                isCreate: false,
                rowId: 'uniqueId',
                rowIndex: 11,
                stateKey: 'test-grid',
                top: 40,
                type: EDIT_ROW,
                values: {
                    col1: true,
                    col2: 'abc'
                }
            });

    });

});

describe('The grid repositionEditor Action', () => {

    const action = {
        type: REPOSITION_EDITOR,
        stateKey: 'test-grid',
        top: 40
    };

    it('Should reposition editor', () => {
        expect(repositionEditor(action))
            .toEqual({
                type: REPOSITION_EDITOR,
                stateKey: 'test-grid',
                top: 40
            });
    });

});

describe('The grid dismissEditor Action', () => {

    const action = {
        type: DISMISS_EDITOR,
        stateKey: 'test-grid'
    };

    it('Should dismiss editor', () => {
        expect(dismissEditor(action))
            .toEqual({
                type: DISMISS_EDITOR,
                stateKey: 'test-grid'
            });
    });

});

describe('The grid updateCellValue Action', () => {

    const action = {
        type: ROW_VALUE_CHANGE,
        stateKey: 'test-grid',
        value: 'newVal',
        name: 'Col1',
        column: {
            name: 'Col1',
            dataIndex: 'col1'
        },
        columns: [
            {
                name: 'Col1',
                dataIndex: 'col1'
            },
            {
                name: 'Col2',
                dataIndex: 'col2'
            }
        ]
    };

    it('Should update cell value', () => {
        expect(updateCellValue(action))
            .toEqual({
                type: ROW_VALUE_CHANGE,
                stateKey: 'test-grid',
                value: 'newVal',
                columnName: 'Col1',
                column: {
                    name: 'Col1',
                    dataIndex: 'col1'
                },
                columns: [
                    {
                        name: 'Col1',
                        dataIndex: 'col1'
                    },
                    {
                        name: 'Col2',
                        dataIndex: 'col2'
                    }
                ]
            });
    });

});

describe('The grid saveRow Action', () => {

    const action = {
        type: SAVE_ROW,
        stateKey: 'test-grid',
        values: {
            col1: true,
            col2: 'abc'
        },
        rowIndex: 4
    };

    it('Should save row values', () => {
        expect(saveRow(action))
            .toEqual({
                type: SAVE_ROW,
                stateKey: 'test-grid',
                values: {
                    col1: true,
                    col2: 'abc'
                },
                rowIndex: 4
            });
    });

});

describe('The grid cancelRow Action', () => {

    const action = {
        type: CANCEL_ROW,
        stateKey: 'test-grid'
    };

    it('Should cancel row values', () => {
        expect(cancelRow(action))
            .toEqual({
                type: CANCEL_ROW,
                stateKey: 'test-grid'
            });
    });

});

describe('The grid removeRow Action', () => {

    const action = {
        type: REMOVE_ROW,
        rowIndex: 31,
        stateKey: 'test-grid'
    };

    it('Should remove row values', () => {
        expect(removeRow(action))
            .toEqual({
                type: REMOVE_ROW,
                rowIndex: 31,
                stateKey: 'test-grid'
            });
    });

});

describe('The grid setEditorValidation Action', () => {

    const action = {
        type: EDITOR_VALIDATION,
        validationState: true,
        stateKey: 'test-grid'
    };

    it('Should set validation state', () => {
        expect(setEditorValidation(action))
            .toEqual({
                type: EDITOR_VALIDATION,
                validationState: true,
                stateKey: 'test-grid'
            });
    });

});

describe('The grid updateRow Action', () => {

    const action = {
        type: UPDATE_ROW,
        stateKey: 'test-grid',
        rowIndex: 2,
        values: {
            valueToUpdate: true
        }
    };

    it('Should return the updateRow action', () => {

        expect(updateRow(action))
            .toEqual({
                type: UPDATE_ROW,
                stateKey: 'test-grid',
                rowIndex: 2,
                values: {
                    valueToUpdate: true
                }
            });
    });

});

describe('The grid addNewRow Action', () => {

    const action = {
        type: ADD_NEW_ROW,
        columns: [
            {
                name: 'Col1',
                dataIndex: 'col1'
            },
            {
                name: 'Col2',
                dataIndex: 'col2'
            }
        ],
        data: {},
        stateKey: 'test-grid'
    };

    const result = [];

    const dispatch = val => (result.push(val));

    addNewRow(action)(dispatch);

    it('Should set validation state', () => {
        expect(result)
            .toEqual([
                {
                    stateKey: 'test-grid',
                    type: 'ADD_NEW_ROW'
                },
                {
                    columns: [
                        {
                            dataIndex: 'col1',
                            name: 'Col1'
                        },
                        {
                            dataIndex: 'col2',
                            name: 'Col2'
                        }
                    ],
                    isCreate: true,
                    rowId: 'cm93MA==',
                    rowIndex: 0,
                    stateKey: 'test-grid',
                    top: 43,
                    type: EDIT_ROW,
                    values: {}
                }
            ]);
    });

});
