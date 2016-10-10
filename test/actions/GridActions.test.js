import expect from 'expect';
import { List } from 'immutable';

import {
    getAsyncData,
    setColumns,
    setSortDirection,
    doLocalSort,
    doRemoteSort,
    setColumnVisibility,
    resizeColumns,
    setData,
    setTreeData,
    setTreeNodeVisibility
} from './../../src/actions/GridActions';

describe('The getAsyncData actions', () => {

    it('Should return a successful res with a function', (done) => {

        const read = () => {
            return new Promise(resolve => {
                resolve({
                    data: [],
                    total: 0
                });
            });
        };

        const res = [];

        getAsyncData({
            dataSource: read,
            stateKey: 'test-grid'
        })((resp) => {
            res.push(resp);
        });

        setTimeout(() => {
            expect(res).toEqual([
                { stateKey: 'test-grid', type: '@@react-redux-grid/DISMISS_EDITOR' },
                {
                    state: true,
                    stateKey: 'test-grid',
                    type: '@@react-redux-grid/SET_LOADING_STATE'
                },
                {
                    state: false,
                    stateKey: 'test-grid',
                    type: '@@react-redux-grid/SET_LOADING_STATE'
                },
                {
                    currentRecords: [],
                    data: [],
                    stateKey: 'test-grid',
                    success: true,
                    total: 0,
                    type: '@@react-redux-grid/SET_DATA'
                }
            ]);
            done();
        }, 0);

    });

    it('Should return a failure res with a faulty function', (done) => {

        const read = () => {
            return new Promise(resolve => {
                resolve({});
            });
        };

        const res = [];

        getAsyncData({
            dataSource: read,
            stateKey: 'test-grid'
        })((resp) => {
            res.push(resp);
        });

        setTimeout(() => {
            expect(res).toEqual([
                { stateKey: 'test-grid', type: '@@react-redux-grid/DISMISS_EDITOR' },
                {
                    state: true,
                    stateKey: 'test-grid',
                    type: '@@react-redux-grid/SET_LOADING_STATE'
                },
                {
                    state: false,
                    stateKey: 'test-grid',
                    type: '@@react-redux-grid/SET_LOADING_STATE'
                },
                {
                    error: 'Unable to Retrieve Grid Data',
                    errorOccurred: true,
                    type: '@@react-redux-grid/ERROR_OCCURRED',
                    stateKey: 'test-grid'
                }
            ]);
            done();
        }, 0);

    });

});

describe('The getAsyncData actions', () => {

    it([
        'Should return the correct remote sort ',
        'response when datasource is a func'].join(''), (done) => {
        const res = [];

        const dataSource = () => (
            new Promise(resolve => resolve({
                data: [],
                total: 0
            }))
        );

        const dispatch = val => (res.push(val));

        doRemoteSort({
            dataSource,
            pageIndex: 1,
            pageSize: 30,
            sortParams: {
                name: 'ASC'
            },
            stateKey: 'test-grid'
        })(dispatch);

        setTimeout(() => {
            expect(res).toEqual([
                {
                    state: true,
                    stateKey: 'test-grid',
                    type: '@@react-redux-grid/SET_LOADING_STATE'
                },
                {
                    currentRecords: [],
                    data: [],
                    stateKey: 'test-grid',
                    success: true,
                    total: 0,
                    type: '@@react-redux-grid/SET_DATA'
                },
                {
                    state: false,
                    stateKey: 'test-grid',
                    type: '@@react-redux-grid/SET_LOADING_STATE'
                }
            ]);
            done();
        }, 10);

    });

});

describe('The setColumns actions', () => {

    const columns = [
        {
            name: 'col1',
            dataIndex: 'col1'
        },
        {
            name: 'col2',
            dataIndex: 'col2'
        }
    ];

    const stateKey = 'test-grid';

    it('Should add a unique ID if none is given', () => {
        expect(setColumns({
            columns,
            stateKey
        })).toEqual({
            type: '@@react-redux-grid/SET_COLUMNS',
            columns: [
                {
                    dataIndex: 'col1',
                    id: 'Y29sMWdyaWQtY29sdW1u',
                    name: 'col1'
                },
                {
                    dataIndex: 'col2',
                    id: 'Y29sMmdyaWQtY29sdW1u',
                    name: 'col2'
                }
            ],
            stateKey,
            stateful: undefined
        });
    });

    it('Should keep id if they are defined', () => {

        const colsWithIds = [
            {
                dataIndex: 'col1',
                id: 'hasanid',
                name: 'col1'
            },
            {
                dataIndex: 'col2',
                id: 'alsohasanid',
                name: 'col2'
            }
        ];

        expect(setColumns({
            columns: colsWithIds,
            stateKey,
            stateful: true
        })).toEqual({
            type: '@@react-redux-grid/SET_COLUMNS',
            columns: colsWithIds,
            stateKey,
            stateful: true
        });

    });

});

describe('The setSortDirection actions', () => {

    const columns = [
        {
            name: 'col1',
            dataIndex: 'col1',
            id: 'uniqueID'
        },
        {
            name: 'col2',
            dataIndex: 'col2',
            id: 'anotherId'
        }
    ];

    const stateKey = 'test-grid';

    it('Should add sort direction', () => {
        expect(setSortDirection({
            columns,
            stateKey,
            sortDirection: 'DESC',
            id: 'uniqueID'
        })).toEqual({
            type: '@@react-redux-grid/SET_SORT_DIRECTION',
            columns: [
                {
                    dataIndex: 'col1',
                    id: 'uniqueID',
                    name: 'col1',
                    sortDirection: 'DESC'
                },
                {
                    dataIndex: 'col2',
                    id: 'anotherId',
                    name: 'col2',
                    sortDirection: null
                }
            ],
            stateKey
        });
    });

    it('Should add sort direction and wipe previous direction', () => {
        expect(setSortDirection({
            columns: [
                {
                    name: 'col1',
                    dataIndex: 'col1',
                    id: 'uniqueID'
                },
                {
                    name: 'col2',
                    dataIndex: 'col2',
                    id: 'anotherId',
                    sortDirection: 'ASC'
                }
            ],
            stateKey,
            sortDirection: 'DESC',
            id: 'uniqueID'
        })).toEqual({
            type: '@@react-redux-grid/SET_SORT_DIRECTION',
            columns: [
                {
                    dataIndex: 'col1',
                    id: 'uniqueID',
                    name: 'col1',
                    sortDirection: 'DESC'
                },
                {
                    dataIndex: 'col2',
                    id: 'anotherId',
                    name: 'col2',
                    sortDirection: null
                }
            ],
            stateKey
        });
    });

});

describe('The doLocalSort actions', () => {

    it('Should return sortObject', () => {
        expect(
            doLocalSort({
                stateKey: 'test-grid',
                data: []
            })
        ).toEqual({
            stateKey: 'test-grid',
            data: [],
            type: '@@react-redux-grid/SORT_DATA'
        });
    });

});

describe('The setColumnVisibility actions', () => {

    it('Should hide column', () => {
        expect(
            setColumnVisibility({
                columns: [
                    {
                        name: 'col1',
                        id: '1',
                        dataIndex: 'col1'
                    },
                    {
                        name: 'col2',
                        id: '2',
                        dataIndex: 'col2'
                    }
                ],
                column: {
                    name: 'col1',
                    id: '1',
                    dataIndex: 'col1'
                },
                isHidden: true,
                stateKey: 'test-grid'
            })
        ).toEqual({
            stateKey: 'test-grid',
            stateful: undefined,
            columns: [
                {
                    name: 'col1',
                    id: '1',
                    dataIndex: 'col1',
                    hidden: false
                },
                {
                    name: 'col2',
                    id: '2',
                    dataIndex: 'col2'
                }
            ],
            type: '@@react-redux-grid/SET_COLUMNS'
        });
    });

    it('Should show column, keeping other column hidden', () => {
        expect(
            setColumnVisibility({
                columns: [
                    {
                        name: 'col1',
                        id: '1',
                        dataIndex: 'col1'
                    },
                    {
                        name: 'col2',
                        id: '2',
                        dataIndex: 'col2',
                        hidden: true
                    }
                ],
                column: {
                    name: 'col1',
                    id: '1',
                    dataIndex: 'col1'
                },
                isHidden: false,
                stateKey: 'test-grid'
            })
        ).toEqual({
            stateKey: 'test-grid',
            stateful: undefined,
            columns: [
                {
                    name: 'col1',
                    id: '1',
                    dataIndex: 'col1',
                    hidden: true
                },
                {
                    name: 'col2',
                    id: '2',
                    dataIndex: 'col2',
                    hidden: true
                }
            ],
            type: '@@react-redux-grid/SET_COLUMNS'
        });
    });

});

describe('The setData action', () => {

    expect(
        setData({
            stateKey: 'test-grid',
            data: [1]
        })
    ).toEqual({
        stateKey: 'test-grid',
        data: [1],
        type: '@@react-redux-grid/SET_DATA'
    });

});

describe('The resizeColumns action', () => {

    it('Should resize column when next column is defined', () => {
        expect(
            resizeColumns({
                columns: [
                    {
                        name: 'col1',
                        id: '1',
                        dataIndex: 'col1'
                    },
                    {
                        name: 'col2',
                        id: '2',
                        dataIndex: 'col2'
                    }
                ],
                width: '20',
                id: '1',
                nextColumn: {
                    id: '2',
                    width: '22'
                },
                stateKey: 'test-grid'
            })
        ).toEqual({
            stateKey: 'test-grid',
            stateful: undefined,
            columns: [
                {
                    name: 'col1',
                    id: '1',
                    dataIndex: 'col1',
                    width: '20%'
                },
                {
                    name: 'col2',
                    id: '2',
                    dataIndex: 'col2',
                    width: '22%'
                }
            ],
            type: '@@react-redux-grid/RESIZE_COLUMNS'
        });
    });

    it('Should resize column when next column is not defined', () => {
        expect(
            resizeColumns({
                columns: [
                    {
                        name: 'col1',
                        id: '1',
                        dataIndex: 'col1'
                    },
                    {
                        name: 'col2',
                        id: '2',
                        dataIndex: 'col2'
                    }
                ],
                width: '20',
                id: '1',
                nextColumn: {},
                stateKey: 'test-grid',
                stateful: true
            })
        ).toEqual({
            stateKey: 'test-grid',
            stateful: true,
            columns: [
                {
                    name: 'col1',
                    id: '1',
                    dataIndex: 'col1',
                    width: '20%'
                },
                {
                    name: 'col2',
                    id: '2',
                    dataIndex: 'col2'
                }
            ],
            type: '@@react-redux-grid/RESIZE_COLUMNS'
        });
    });
});

describe('The setTreeNodeVisibility action', () => {

        it('Should return default hide action', () => {
            expect(setTreeNodeVisibility({
                id: 'someId',
                type: '@@react-redux-grid/SET_TREE_NODE_VISIBILITY',
                stateKey: 'tree-grid',
                showTreeRootNode: false
            })).toEqual({
                id: 'someId',
                type: '@@react-redux-grid/SET_TREE_NODE_VISIBILITY',
                stateKey: 'tree-grid',
                showTreeRootNode: false,
                visible: undefined
            });
        });

        it('Should pass visiblity state', () => {
            expect(setTreeNodeVisibility({
                id: 'someId',
                type: '@@react-redux-grid/SET_TREE_NODE_VISIBILITY',
                stateKey: 'tree-grid',
                showTreeRootNode: false,
                visible: true
            })).toEqual({
                id: 'someId',
                type: '@@react-redux-grid/SET_TREE_NODE_VISIBILITY',
                stateKey: 'tree-grid',
                showTreeRootNode: false,
                visible: true
            });
        });
    });

});

describe('The setTreeData action', () => {

    const data = {
        root: {
            id: -1,
            children: [
                {
                    id: 1,
                    parentId: -1,
                    children: [
                        {
                            id: 11,
                            parentId: 1
                        },
                        {
                            id: 12,
                            parentId: 1,
                            children: [
                                {
                                    id: 121,
                                    parentId: 12,
                                    children: [
                                        {
                                            id: 1211,
                                            parentId: 121
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    parentId: -1,
                    children: [
                        {
                            id: 21,
                            parentId: 2
                        }
                    ]
                }
            ]
        }
    };

    it('Should return action with root node', () => {
        const { data: expectedData, ...expectedRest } = setTreeData({
            data,
            stateKey: 'tree-grid',
            showTreeRootNode: true
        });

        expect(expectedRest).toEqual({
            type: '@@react-redux-grid/SET_DATA',
            stateKey: 'tree-grid',
            gridType: 'tree',
            treeData: data
        });

        expect(List.isList(expectedData))
            .toBe(true, 'Expect the data results to be a List');

        const count = 8;

        expect(expectedData.count())
            .toBe(
                count,
                `Expect there to be ${count} flat records returned`
            );

    });

    it('Should return action without root node', () => {

        const { data: expectedData, ...expectedRest } = setTreeData({
            data,
            stateKey: 'tree-grid',
            showTreeRootNode: false
        });

        expect(expectedRest).toEqual({
            type: '@@react-redux-grid/SET_DATA',
            stateKey: 'tree-grid',
            gridType: 'tree',
            treeData: data
        });

        expect(List.isList(expectedData))
            .toBe(true, 'Expect the data results to be a List');

        const count = 7;

        expect(expectedData.count())
            .toBe(
                count,
                `Expect there to be ${count} flat records returned`
            );
    });
});
