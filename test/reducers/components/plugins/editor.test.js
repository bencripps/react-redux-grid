/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    EDIT_ROW,
    DISMISS_EDITOR,
    ROW_VALUE_CHANGE,
    CANCEL_ROW,
    REMOVE_ROW
} from './../../../../src/constants/ActionTypes';

import
    editor,
    { isCellValid, isRowValid }
from './../../../../src/reducers/components/plugins/editor';

describe('The editor reducer isCellValid func', () => {

    it('Should use a validator if avail', () => {

        const column = {
            validator: ({ value }) => {
                return value === 1;
            },
            name: 'One Column'
        };

        expect(
            isCellValid(column, 1)
        ).toEqual(true);

    });

    it('Should return valid if no validator is avail', () => {

        const column = {
            name: 'One Column'
        };

        expect(
            isCellValid(column, 1)
        ).toEqual(true);

    });

    it('Should return invalid with validator and bad val', () => {

        const column = {
            validator: ({ value }) => {
                return value === 1;
            },
            name: 'One Column'
        };

        expect(
            isCellValid(column, 2)
        ).toEqual(false);

    });

});

describe('The editor reducer isRowValid func', () => {

    it('Should return a valid row', () => {

        const columns = [
            {
                name: 'Column 1',
                dataIndex: 'col1',
                validator: ({ value }) => {
                    return value === 1;
                }
            },
            {
                name: 'Column 2',
                dataIndex: 'col2'
            }
        ];

        const rowValues = {
            col1: 1,
            col2: NaN
        };

        expect(
            isRowValid(columns, rowValues)
        ).toEqual(true);

    });

    it('Should return an invalid row', () => {

        const columns = [
            {
                name: 'Column 1',
                dataIndex: 'col1',
                validator: ({ value }) => {
                    return value === 2;
                }
            },
            {
                name: 'Column 2',
                dataIndex: 'col2'
            }
        ];

        const rowValues = {
            col1: 1,
            col2: NaN
        };

        expect(
            isRowValid(columns, rowValues)
        ).toEqual(false);

    });

    it('Should return an valid if more cols exist than values', () => {

        const columns = [
            {
                name: 'Column 1',
                dataIndex: 'col1',
                validator: ({ value }) => {
                    return value === 1;
                }
            },
            {
                name: 'Column 2',
                dataIndex: 'col2'
            },
            {
                nane: 'banana',
                dataIndex: 'banana'
            }
        ];

        const rowValues = {
            col1: 1,
            col2: NaN
        };

        expect(
            isRowValid(columns, rowValues)
        ).toEqual(true);

    });

});

describe('The editor reducer EDIT_ROW action', () => {

    const state = fromJS({});

    it('Should return the correct edit-not-create response', () => {

        const action = {
            type: EDIT_ROW,
            stateKey: 'test-grid',
            columns: [
                {
                    name: 'Col1',
                    dataIndex: 'col1',
                    validator: ({ value }) => {
                        return value === 1;
                    }
                },
                {
                    name: 'Col2',
                    dataIndex: 'col2'
                }
            ],
            values: {
                col1: 1,
                col2: 2
            },
            rowIndex: 2,
            rowId: 'rowid-2',
            top: 30
        };

        expect(
            editor(state, action)
        ).toEqual(fromJS({
            'test-grid': {
                row: {
                    key: 'rowid-2',
                    values: {
                        col1: 1,
                        col2: 2
                    },
                    rowIndex: 2,
                    top: 30,
                    valid: true,
                    isCreate: false
                }
            }
        }));
    });

    it('Should return the correct edit-create response', () => {

        const action = {
            type: EDIT_ROW,
            stateKey: 'test-grid',
            columns: [
                {
                    name: 'Col1',
                    dataIndex: 'col1',
                    validator: ({ value }) => {
                        return value === 2;
                    }
                },
                {
                    name: 'Col2',
                    dataIndex: 'col2'
                }
            ],
            values: {
                col1: 1,
                col2: 2
            },
            rowIndex: 2,
            isCreate: true,
            rowId: 'rowid-2',
            top: 30
        };

        expect(
            editor(state, action)
        ).toEqual(fromJS({
            'test-grid': {
                row: {
                    key: 'rowid-2',
                    values: {
                        col1: 1,
                        col2: 2
                    },
                    rowIndex: 2,
                    top: 30,
                    valid: false,
                    isCreate: true
                }
            }
        }));

    });

});

describe('The editor reducer ROW_VALUE_CHANGE action', () => {

    it('Should return the correct rowValue change response', () => {

        const state = fromJS({
            'test-grid': {
                row: {
                    key: 'rowid-2',
                    values: {
                        col1: NaN,
                        col2: NaN
                    },
                    rowIndex: 2,
                    top: 30,
                    valid: false,
                    isCreate: true
                }
            }
        });

        const action = {
            type: ROW_VALUE_CHANGE,
            columns: [
                {
                    name: 'Col1',
                    dataIndex: 'col2',
                    validator: ({ value }) => {
                        return value === 1;
                    }
                },
                {
                    name: 'Col2',
                    dataIndex: 'col2'
                }
            ],
            column: {
                name: 'Col1',
                dataIndex: 'col2',
                validator: ({ value }) => {
                    return value === 1;
                }
            },
            value: 1,
            stateKey: 'test-grid'
        };

        expect(
            editor(state, action)
        ).toEqual(fromJS({
            'test-grid': {
                row: {
                    key: 'rowid-2',
                    values: {
                        col1: NaN,
                        col2: 1
                    },
                    rowIndex: 2,
                    top: 30,
                    valid: true,
                    isCreate: true,
                    previousValues: {
                        col1: NaN,
                        col2: NaN
                    }
                }
            }
        }));

    });

});

describe([
    'The editor reducer REMOVE_ROW action, ',
    'The editor reducer DISMISS_EDITOR action, ',
    'The editor reducer CANCEL_ROW action'].join(''), () => {

    it('Should wipe the values upon remove', () => {

        const state = fromJS({
            'test-grid': {
                row: {
                    key: 'rowid-2',
                    values: {
                        col1: NaN,
                        col2: NaN
                    },
                    rowIndex: 2,
                    top: 30,
                    valid: false,
                    isCreate: true
                }
            }
        });

        const action = {
            type: REMOVE_ROW,
            stateKey: 'test-grid'
        };

        expect(
            editor(state, action)
        ).toEqual(fromJS({
            'test-grid': {}
        }));
    });

    it('Should wipe the values upon DISMISS_EDITOR', () => {

        const state = fromJS({
            'test-grid': {
                row: {
                    key: 'rowid-2',
                    values: {
                        col1: NaN,
                        col2: NaN
                    },
                    rowIndex: 2,
                    top: 30,
                    valid: false,
                    isCreate: true
                }
            }
        });

        const action = {
            type: DISMISS_EDITOR,
            stateKey: 'test-grid'
        };

        expect(
            editor(state, action)
        ).toEqual(fromJS({
            'test-grid': {}
        }));
    });

    it('Should wipe the values upon CANCEL_ROW', () => {

        const state = fromJS({
            'test-grid': {
                row: {
                    key: 'rowid-2',
                    values: {
                        col1: NaN,
                        col2: NaN
                    },
                    rowIndex: 2,
                    top: 30,
                    valid: false,
                    isCreate: true
                }
            }
        });

        const action = {
            type: DISMISS_EDITOR,
            stateKey: 'test-grid'
        };

        expect(
            editor(state, action)
        ).toEqual(fromJS({
            'test-grid': {}
        }));
    });

});
