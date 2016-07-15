/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    EDIT_ROW,
    DISMISS_EDITOR,
    ROW_VALUE_CHANGE,
    CANCEL_ROW,
    REMOVE_ROW,
    REPOSITION_EDITOR
} from './../../../../src/constants/ActionTypes';

import
    editor,
    { isCellValid, isRowValid, setDisabled, handleChangeFunc }
from './../../../../src/reducers/components/plugins/editor';

import {
    generateLastUpdate,
    resetLastUpdate
} from './../../../../src/util/lastUpdate';

describe('The editor reducer handleChangeFunc func', () => {

    it('Should leave values unchanged', () => {
        const rowValues = {
            val1: true,
            val2: 'banana'
        };

        const col = {
            dataIndex: 'val1',
            name: 'Val'
        };

        expect(handleChangeFunc(col, rowValues))
            .toEqual(rowValues);

    });

    it('Should update a single value', () => {
        const rowValues = {
            val1: true,
            val2: 'banana'
        };

        const col = {
            dataIndex: 'val1',
            name: 'Val',
            change: ({ values }) => {
                if (values.val1) {
                    return {
                        val2: 'notABanana'
                    };
                }
            }
        };

        expect(handleChangeFunc(col, rowValues))
            .toEqual({
                val1: true,
                val2: 'notABanana'
            });

    });

    it('Should update multiple value', () => {
        const rowValues = {
            val1: true,
            val2: 'banana'
        };

        const col = {
            dataIndex: 'val1',
            name: 'Val',
            change: ({ values }) => {
                if (values.val1) {
                    return {
                        val2: 'notABanana',
                        val1: false
                    };
                }
            }
        };

        expect(handleChangeFunc(col, rowValues))
            .toEqual({
                val1: false,
                val2: 'notABanana'
            });

    });

});

describe('The editor reducer isCellValid func', () => {

    const col = {
        dataIndex: 'name',
        name: 'Name',
        disabled: ({ value }) => {
            return value === 'ben';
        }
    };

    it('Should return false', () => {
        expect(
            setDisabled(col, 'Matt', {})
        ).toEqual(false);

    });

    it('Should return true', () => {
        expect(
            setDisabled(col, 'Ben', {})
        ).toEqual(false);
    });

    it('Should return true if prop is explicitly set', () => {
        const explicitCol = {
            dataIndex: 'name',
            name: 'Name',
            disabled: true
        };
        expect(
            setDisabled(explicitCol, 'Ben', {})
        ).toEqual(true);
    });

    it('Should return false if prop is explicitly set', () => {
        const explicitCol = {
            dataIndex: 'name',
            name: 'Name',
            disabled: false
        };
        expect(
            setDisabled(explicitCol, 'Ben', {})
        ).toEqual(false);
    });

    it('Should return true with a more complex scenario', () => {

        const complexCol = {
            dataIndex: 'name',
            name: 'Name',
            disabled: ({ value, values }) => {
                return value !== 'ben' && values.shouldDisable;
            }
        };

        expect(
            setDisabled(complexCol, 'Matt', { shouldDisable: true })
        ).toEqual(true);

    });

});

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
    beforeEach(() => resetLastUpdate());

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
        ).toEqualImmutable(fromJS({
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
                    isCreate: false,
                    overrides: {
                        col1: {
                            disabled: false
                        },
                        col2: {
                            disabled: false
                        }
                    }
                },
                lastUpdate: 1
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
        ).toEqualImmutable(fromJS({
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
                    isCreate: true,
                    overrides: {
                        col1: {
                            disabled: false
                        },
                        col2: {
                            disabled: false
                        }
                    }
                },
                lastUpdate: 1
            }
        }));

        it('Should return the correct edit-create with disable', () => {

            const disableAction = {
                type: EDIT_ROW,
                stateKey: 'test-grid',
                columns: [
                    {
                        name: 'Col1',
                        dataIndex: 'col1',
                        validator: ({ value }) => {
                            return value === 2;
                        },
                        disabled: () => {
                            return true;
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
                editor(state, disableAction)
            ).toEqualImmutable(fromJS({
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
                        isCreate: true,
                        overrides: {
                            col1: {
                                disabled: true
                            },
                            col2: {
                                disabled: false
                            }
                        }
                    },
                    lastUpdate: 1
                }
            }));
        });

    });

});

describe('The editor reducer REPOSITION_EDITOR action', () => {
    beforeEach(() => resetLastUpdate());

    it('Should set the new editor top', () => {

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
            type: REPOSITION_EDITOR,
            top: 301,
            stateKey: 'test-grid'
        };

        expect(
            editor(state, action)
        ).toEqualImmutable(fromJS({
            'test-grid': {
                row: {
                    key: 'rowid-2',
                    values: {
                        col1: NaN,
                        col2: NaN
                    },
                    rowIndex: 2,
                    top: 301,
                    valid: false,
                    isCreate: true
                },
                lastUpdate: 1
            }
        }));
    });

});

describe('The editor reducer ROW_VALUE_CHANGE action', () => {
    beforeEach(() => resetLastUpdate());

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
                    isCreate: true,
                    overrides: {}
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
                    dataIndex: 'col1'
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
        ).toEqualImmutable(fromJS({
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
                    overrides: {
                        col1: {
                            disabled: false
                        },
                        col2: {
                            disabled: false
                        }
                    },
                    previousValues: {
                        col1: NaN,
                        col2: NaN
                    }
                },
                lastUpdate: 1
            }
        }));

    });

});

describe([
    'The editor reducer REMOVE_ROW action, ',
    'The editor reducer DISMISS_EDITOR action, ',
    'The editor reducer CANCEL_ROW action'].join(''), () => {
    beforeEach(() => resetLastUpdate());

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
        ).toEqualImmutable(fromJS({
            'test-grid': { lastUpdate: 1 }
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
        ).toEqualImmutable(fromJS({
            'test-grid': { lastUpdate: 1}
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
        ).toEqualImmutable(fromJS({
            'test-grid': { lastUpdate: 1 }
        }));
    });

});
