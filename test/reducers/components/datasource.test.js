/* eslint-enable describe it */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    SET_DATA,
    DISMISS_EDITOR,
    REMOVE_ROW,
    ADD_NEW_ROW,
    SAVE_ROW,
    SORT_DATA,
    CLEAR_FILTER_LOCAL,
    FILTER_DATA,
    UPDATE_ROW
} from './../../../src/constants/ActionTypes';

import
    dataSource
from './../../../src/reducers/components/datasource';

import {
    resetLastUpdate
} from './../../../src/util/lastUpdate';

import {
    DataSource as DataSourceRecord
} from './../../../src/records';

import { testState } from './../../testUtils';

describe('The grid dataSource reducer setData func', () => {
    beforeEach(() => resetLastUpdate());

    it('Should set data with a total', () => {

        const state = testState();

        const action = {
            stateKey: 'test-grid',
            type: SET_DATA,
            total: 2,
            data: fromJS([{ x: 1 }, { x: 2 }])
        };

        expect(
            dataSource(state, action).get('test-grid')
        ).toEqual(
            new DataSourceRecord({
                data: fromJS([
                    { x: 1, _key: 'row-0' }, { x: 2, _key: 'row-1' }
                ]),
                proxy: fromJS([
                    { x: 1, _key: 'row-0' }, { x: 2, _key: 'row-1' }
                ]),
                treeData: undefined,
                gridType: 'grid',
                total: 2,
                currentRecords: fromJS([
                    { x: 1, _key: 'row-0' }, { x: 2, _key: 'row-1' }
                ]),
                lastUpdate: 1
            })
        );

    });

    it('Should set data without a total', () => {

        const state = testState();

        const action = {
            stateKey: 'test-grid',
            type: SET_DATA,
            data: fromJS([{x: 1}, {x: 2}])
        };

        expect(
            dataSource(state, action).get('test-grid')
        ).toEqual(
            new DataSourceRecord({
                data: fromJS([
                    { x: 1, _key: 'row-0' }, { x: 2, _key: 'row-1' }
                ]),
                proxy: fromJS([
                    { x: 1, _key: 'row-0' }, { x: 2, _key: 'row-1' }
                ]),
                total: 2,
                treeData: undefined,
                gridType: 'grid',
                currentRecords: fromJS([
                    { x: 1, _key: 'row-0' }, { x: 2, _key: 'row-1' }
                ]),
                lastUpdate: 1
            })
        );

    });

    it('Should set currentRecords when they are passed', () => {

        const state = testState();

        const action = {
            stateKey: 'test-grid-curr',
            type: SET_DATA,
            data: fromJS([{x: 1}, {x: 2}]),
            currentRecords: [
                { banana: 2 }
            ],
            lastUpdate: 1
        };

        expect(
            dataSource(state, action).get('test-grid-curr')
        ).toEqual(
            new DataSourceRecord({
                data: fromJS([
                    { x: 1, _key: 'row-0' }, { x: 2, _key: 'row-1' }
                ]),
                proxy: fromJS([
                    { x: 1, _key: 'row-0' }, { x: 2, _key: 'row-1' }
                ]),
                total: 2,
                treeData: undefined,
                gridType: 'grid',
                currentRecords: fromJS([{ banana: 2, _key: 'row-0' }]),
                isEditing: false,
                lastUpdate: 1
            })
        );

    });

});

describe('The grid dataSource reducer dissmissEditor func', () => {
    beforeEach(() => resetLastUpdate());

    it('Should wipe previous values upon dissmiss', () => {

        const inState = testState({
            'test-grid': new DataSourceRecord({
                proxy: fromJS([
                    { cell: 1 },
                    { cell: 2 }
                ]),
                total: 2
            })
        });

        const action = {
            stateKey: 'test-grid',
            type: DISMISS_EDITOR
        };

        expect(
            dataSource(inState, action).get('test-grid')
        ).toEqualImmutable(
            new DataSourceRecord({
                proxy: fromJS([
                    { cell: 1 },
                    { cell: 2 }
                ]),
                total: 2,
                data: fromJS([
                    { cell: 1 },
                    { cell: 2 }
                ]),
                currentRecords: fromJS([
                    { cell: 1 },
                    { cell: 2 }
                ]),
                isEditing: false,
                lastUpdate: 1
            })
        );
    });

    it('Should decrement total if proxy less values than data', () => {

        const inState = fromJS({
            'test-grid': {
                data: [
                    { cell: 1 },
                    { cell: 2 },
                    { cell: 3 }

                ],
                proxy: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                total: 3
            }
        });

        const outState = fromJS({
            'test-grid': {
                proxy: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                total: 2,
                data: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                currentRecords: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                isEditing: false,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            type: DISMISS_EDITOR
        };

        expect(
            dataSource(inState, action)
        ).toEqualImmutable(outState);
    });

    it('Should decrement and maintain total if proxy less values than data',
        () => {
            const inState = fromJS({
                'test-grid': {
                    data: [
                        { cell: 1 },
                        { cell: 2 },
                        { cell: 3 }

                    ],
                    proxy: [
                        { cell: 1 },
                        { cell: 2 }
                    ],
                    total: 151
                }
            });

            const outState = fromJS({
                'test-grid': {
                    proxy: [
                        { cell: 1 },
                        { cell: 2 }
                    ],
                    total: 150,
                    data: [
                        { cell: 1 },
                        { cell: 2 }
                    ],
                    currentRecords: [
                        { cell: 1 },
                        { cell: 2 }
                    ],
                    isEditing: false,
                    lastUpdate: 1
                }
            });

            const action = {
                stateKey: 'test-grid',
                type: DISMISS_EDITOR
            };

            expect(
                dataSource(inState, action)
            ).toEqualImmutable(outState);
        });
});

describe('The grid dataSource reducer removeRow func', () => {
    beforeEach(() => resetLastUpdate());

    const inState = fromJS({
        'test-grid': {
            proxy: [
                { cell: 1 },
                { cell: 2 }
            ],
            data: [
                { cell: 1 },
                { cell: 2 }
            ],
            currentRecords: [
                { cell: 1 },
                { cell: 2 }
            ],
            total: 2,
            lastUpdate: 1
        }
    });

    it('Should remove row at 0 index of none is passed', () => {

        const outState = fromJS({
            'test-grid': {
                proxy: [
                    { cell: 2 }
                ],
                data: [
                    { cell: 2 }
                ],
                currentRecords: [
                    { cell: 2 }
                ],
                total: 1,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            type: REMOVE_ROW
        };

        expect(
            dataSource(inState, action)
        ).toEqualImmutable(outState);
    });

    it('Should remove row at 1 index if arg is passed', () => {

        const outState = fromJS({
            'test-grid': {
                proxy: [
                    { cell: 1 }
                ],
                data: [
                    { cell: 1 }
                ],
                currentRecords: [
                    { cell: 1 }
                ],
                total: 1,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            rowIndex: 1,
            type: REMOVE_ROW
        };

        expect(
            dataSource(inState, action)
        ).toEqualImmutable(outState);

    });

    it('Should default total to 0 when inState total is 0', () => {

        const customInState = fromJS({
            'test-grid': {
                proxy: [],
                data: [],
                currentRecords: [],
                total: 0,
                lastUpdate: 1
            }
        });

        const outState = fromJS({
            'test-grid': {
                proxy: [],
                data: [],
                currentRecords: [],
                total: 0,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            rowIndex: 1,
            type: REMOVE_ROW
        };

        expect(
            dataSource(customInState, action)
        ).toEqualImmutable(outState);

    });

    it('Should default total to 0 when total not provided', () => {

        const customInState = fromJS({
            'test-grid': {
                proxy: [],
                data: [],
                currentRecords: [],
                lastUpdate: 1
            }
        });

        const outState = fromJS({
            'test-grid': {
                proxy: [],
                data: [],
                currentRecords: [],
                total: 0,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            rowIndex: 1,
            type: REMOVE_ROW
        };

        expect(
            dataSource(customInState, action)
        ).toEqualImmutable(outState);

    });

    it('Should default total to 0 when total provided is negative', () => {

        const customInState = fromJS({
            'test-grid': {
                proxy: [],
                data: [],
                currentRecords: [],
                total: -1,
                lastUpdate: 1
            }
        });

        const outState = fromJS({
            'test-grid': {
                proxy: [],
                data: [],
                currentRecords: [],
                total: 0,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            rowIndex: 1,
            type: REMOVE_ROW
        };

        expect(
            dataSource(customInState, action)
        ).toEqualImmutable(outState);

    });

});

describe('The grid dataSource reducer addRow func', () => {
    beforeEach(() => resetLastUpdate());

    const inState = fromJS({
        'test-grid': {
            proxy: [
                { cell: 1 },
                { cell: 2 }
            ],
            data: [
                { cell: 1 },
                { cell: 2 }
            ],
            currentRecords: [
                { cell: 1 },
                { cell: 2 }
            ],
            total: 2
        }
    });

    it('Should add a new blank row if rows have been established', () => {
        const outState = fromJS({
            'test-grid': {
                proxy: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                data: [
                    { cell: '', _key: 'row-0' },
                    { cell: 1 },
                    { cell: 2 }
                ],
                currentRecords: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                total: 3,
                isEditing: true,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            rowId: 'row-0',
            rowIndex: 0,
            type: ADD_NEW_ROW
        };

        expect(
            dataSource(inState, action)
        ).toEqualImmutable(outState);
    });

    it('Should add a new row and maintain total if multiple pages', () => {
        const customInState = fromJS({
            'test-grid': {
                proxy: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                data: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                currentRecords: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                total: 150
            }
        });

        const outState = fromJS({
            'test-grid': {
                proxy: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                data: [
                    { cell: '', _key: 'row-0' },
                    { cell: 1 },
                    { cell: 2 }
                ],
                currentRecords: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                total: 151,
                isEditing: true,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            rowId: 'row-0',
            type: ADD_NEW_ROW
        };

        expect(
            dataSource(customInState, action)
        ).toEqualImmutable(outState);
    });

    it('Should add a new row and + 1 to total when no total on inState', () => {
        const customInState = fromJS({
            'test-grid': {
                proxy: [],
                data: [],
                currentRecords: []
            }
        });

        const outState = fromJS({
            'test-grid': {
                proxy: [],
                data: [{_key: 'row-0'}],
                currentRecords: [],
                total: 1,
                isEditing: true,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            rowId: 'row-0',
            type: ADD_NEW_ROW
        };

        expect(
            dataSource(customInState, action)
        ).toEqualImmutable(outState);
    });

    it('Should add a new blank row if no rows have been established', () => {
        const innerState = fromJS({
            'test-grid': {
                proxy: [],
                data: [],
                currentRecords: [],
                total: 0,
                lastUpdate: 1
            }
        });

        const outState = fromJS({
            'test-grid': {
                proxy: [],
                data: [{_key: 'row-id'}],
                currentRecords: [],
                total: 1,
                isEditing: true,
                lastUpdate: 1
            }
        });

        const action = {
            rowId: 'row-id',
            stateKey: 'test-grid',
            rowIndex: 0,
            type: ADD_NEW_ROW
        };

        expect(
            dataSource(innerState, action)
        ).toEqualImmutable(outState);
    });

});

describe('The grid dataSource reducer saveRow func', () => {
    beforeEach(() => resetLastUpdate());

    const inState = fromJS({
        'test-grid': {
            proxy: [
                { cell: 1 },
                { cell: 2 }
            ],
            data: [
                { cell: 1 },
                { cell: 2 }
            ],
            currentRecords: [
                { cell: 1 },
                { cell: 2 }
            ],
            total: 2,
            lastUpdate: 1
        }
    });

    it('Should update row values on save', () => {

        const outState = fromJS({
            'test-grid': {
                proxy: [
                    { cell: 'newValues' },
                    { cell: 2 }
                ],
                data: [
                    { cell: 'newValues' },
                    { cell: 2 }
                ],
                currentRecords: [
                    { cell: 'newValues' },
                    { cell: 2 }
                ],
                total: 2,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            type: SAVE_ROW,
            rowIndex: 0,
            values: { cell: 'newValues' }
        };

        expect(
            dataSource(inState, action)
        ).toEqualImmutable(outState);

    });

});

describe('The grid dataSource reducer sortData func', () => {
    beforeEach(() => resetLastUpdate());

    const inState = fromJS({
        'test-grid': {
            proxy: [
                { cell: 1 },
                { cell: 2 }
            ],
            data: [
                { cell: 1 },
                { cell: 2 }
            ],
            currentRecords: [
                { cell: 1 },
                { cell: 2 }
            ],
            total: 2,
            lastUpdate: 1
        }
    });

    it('Should update sort data', () => {

        const outState = fromJS({
            'test-grid': {
                proxy: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                data: [
                    { cell: 2 },
                    { cell: 1 }
                ],
                currentRecords: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                total: 2,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            type: SORT_DATA,
            data: [
                { cell: 2 },
                { cell: 1 }
            ]
        };

        expect(
            dataSource(inState, action)
        ).toEqualImmutable(outState);

    });

});

describe('The grid dataSource reducer clearFilter func', () => {
    beforeEach(() => resetLastUpdate());

    const inState = fromJS({
        'test-grid': {
            proxy: [
                { cell: 1 },
                { cell: 2 }
            ],
            data: [
                { cell: 2 },
                { cell: 1 }
            ],
            currentRecords: [
                { cell: 2 },
                { cell: 1 }
            ],
            total: 2,
            lastUpdate: 1
        }
    });

    it('Should revert back to proxy if avail', () => {

        const outState = fromJS({
            'test-grid': {
                proxy: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                data: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                currentRecords: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                total: 2,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            type: CLEAR_FILTER_LOCAL
        };

        expect(
            dataSource(inState, action)
        ).toEqualImmutable(outState);

    });

});

describe('The grid dataSource reducer updateRow action', () => {
    beforeEach(() => resetLastUpdate());

    const inStateForUpdate = fromJS({
        'test-grid': {
            proxy: [
                { cell: 1 },
                { cell: 2, otherCell: 2 }
            ],
            data: [
                { cell: 1 },
                { cell: 2, otherCell: 2 }
            ],
            currentRecords: [
                { cell: 1 },
                { cell: 2, otherCell: 2 }
            ],
            total: 2,
            lastUpdate: 1
        }
    });

    it('Should update a single value', () => {

        const action = {
            stateKey: 'test-grid',
            type: UPDATE_ROW,
            rowIndex: 1,
            values: {
                cell: 'moreNewVals'
            }
        };

        expect(dataSource(inStateForUpdate, action))
            .toEqualImmutable(fromJS({
                'test-grid': {
                    proxy: [
                        { cell: 1 },
                        { cell: 'moreNewVals', otherCell: 2 }
                    ],
                    data: [
                        { cell: 1 },
                        { cell: 'moreNewVals', otherCell: 2 }
                    ],
                    currentRecords: [
                        { cell: 1 },
                        { cell: 'moreNewVals', otherCell: 2 }
                    ],
                    total: 2,
                    lastUpdate: 1
                }
            }));
    });

    it('Should update a multiple value', () => {

        const action = {
            stateKey: 'test-grid',
            type: UPDATE_ROW,
            rowIndex: 1,
            values: {
                cell: 'moreNewVals',
                otherCell: 'newValforCell2'
            }
        };

        expect(dataSource(inStateForUpdate, action))
            .toEqualImmutable(fromJS({
                'test-grid': {
                    proxy: [
                        { cell: 1 },
                        { cell: 'moreNewVals', otherCell: 'newValforCell2' }
                    ],
                    data: [
                        { cell: 1 },
                        { cell: 'moreNewVals', otherCell: 'newValforCell2' }
                    ],
                    currentRecords: [
                        { cell: 1 },
                        { cell: 'moreNewVals', otherCell: 'newValforCell2' }
                    ],
                    total: 2,
                    lastUpdate: 1
                }
            }));

    });

    it('Should return existing state if index doesnt exist', () => {

        const action = {
            stateKey: 'test-grid',
            type: UPDATE_ROW,
            rowIndex: 100,
            values: {
                cell: 'moreNewVals',
                otherCell: 'newValforCell2'
            }
        };

        expect(dataSource(inStateForUpdate, action))
            .toEqualImmutable(fromJS(inStateForUpdate));

    });
});

describe('The grid dataSource reducer filterData func', () => {
    beforeEach(() => resetLastUpdate());

    const inState = fromJS({
        'test-grid': {
            proxy: [
                { cell: 1 },
                { cell: 2 }
            ],
            data: [
                { cell: 1 },
                { cell: 2 }
            ],
            currentRecords: [
                { cell: 1 },
                { cell: 2 }
            ],
            total: 2,
            lastUpdate: 1
        }
    });

    it('Should revert back to proxy if avail', () => {

        const outState = fromJS({
            'test-grid': {
                proxy: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                data: [
                    { cell: 'newVals' },
                    { cell: 'moreNewVals' }
                ],
                currentRecords: [
                    { cell: 1 },
                    { cell: 2 }
                ],
                total: 2,
                lastUpdate: 1
            }
        });

        const action = {
            stateKey: 'test-grid',
            type: FILTER_DATA,
            data: [
                { cell: 'newVals' },
                { cell: 'moreNewVals' }
            ]
        };

        expect(
            dataSource(inState, action)
        ).toEqualImmutable(outState);

    });

});
