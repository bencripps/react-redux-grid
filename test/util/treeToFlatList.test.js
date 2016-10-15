/* eslint-enable describe it sinon */

import expect from 'expect';
import {
    treeToFlatList
} from './../../src/util/treeToFlatList';

describe('the treeFlatList utility', () => {

    it('Should turn a tree into a flat list with no identifier', () => {

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

        expect(
            treeToFlatList(data).toJS()
        ).toEqual([
            {
                _id: -1,
                _parentId: 'root',
                _depth: 0,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 0,
                _isExpanded: true,
                _path: [],
                _key: 'tree-item--1',
                _parentIndex: 0,
                _flatIndex: 0,
                _isFirstChild: true,
                _isLastChild: false,
                _previousSiblingId: undefined,
                _previousSiblingTotalChilden: 0
            },
            {
                _id: 1,
                _parentId: -1,
                _depth: 1,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 0,
                _isExpanded: true,
                _path: [-1],
                _key: 'tree-item-1',
                _parentIndex: 0,
                _flatIndex: 1,
                _isFirstChild: true,
                _isLastChild: false,
                _previousSiblingId: undefined,
                _previousSiblingTotalChilden: 0
            },
            {
                _id: 11,
                _parentId: 1,
                _depth: 2,
                _leaf: true,
                _hideChildren: undefined,
                _hasChildren: undefined,
                _index: 0,
                _isExpanded: undefined,
                _path: [-1, 1],
                _key: 'tree-item-11',
                _parentIndex: 0,
                _flatIndex: 3,
                _isFirstChild: true,
                _isLastChild: false,
                _previousSiblingId: undefined,
                _previousSiblingTotalChilden: 0
            },
            {
                _id: 12,
                _parentId: 1,
                _depth: 2,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 1,
                _isExpanded: true,
                _path: [-1, 1],
                _key: 'tree-item-12',
                _parentIndex: 0,
                _flatIndex: 4,
                _isFirstChild: false,
                _isLastChild: true,
                _previousSiblingId: 11,
                _previousSiblingTotalChilden: 0
            },
            {
                _id: 121,
                _parentId: 12,
                _depth: 3,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 0,
                _isExpanded: true,
                _path: [-1, 1, 12],
                _key: 'tree-item-121',
                _parentIndex: 1,
                _flatIndex: 5,
                _isFirstChild: true,
                _isLastChild: true,
                _previousSiblingId: undefined,
                _previousSiblingTotalChilden: 0
            },
            {
                _id: 1211,
                _parentId: 121,
                _depth: 4,
                _leaf: true,
                _hideChildren: undefined,
                _hasChildren: undefined,
                _index: 0,
                _isExpanded: undefined,
                _path: [-1, 1, 12, 121],
                _key: 'tree-item-1211',
                _parentIndex: 0,
                _flatIndex: 6,
                _isFirstChild: true,
                _isLastChild: true,
                _previousSiblingId: undefined,
                _previousSiblingTotalChilden: 0
            },
            {
                _id: 2,
                _parentId: -1,
                _depth: 1,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 1,
                _isExpanded: true,
                _path: [-1],
                _key: 'tree-item-2',
                _parentIndex: 0,
                _flatIndex: 2,
                _isFirstChild: false,
                _isLastChild: true,
                _previousSiblingId: 1,
                _previousSiblingTotalChilden: 2
            },
            {
                _id: 21,
                _parentId: 2,
                _depth: 2,
                _leaf: true,
                _hideChildren: undefined,
                _hasChildren: undefined,
                _index: 0,
                _isExpanded: undefined,
                _path: [-1, 2],
                _key: 'tree-item-21',
                _parentIndex: 1,
                _flatIndex: 7,
                _isFirstChild: true,
                _isLastChild: true,
                _previousSiblingId: undefined,
                _previousSiblingTotalChilden: 0
            }
        ]);

    });

    it('Should turn a tree into a flat list with identifiers', () => {

        const data = {
            topLevel: {
                id: -1,
                childz: [
                    {
                        id: 1,
                        parentId: -1,
                        childz: [
                            {
                                id: 11,
                                parentId: 1
                            }
                        ]
                    }
                ]
            }
        };

        const actual = treeToFlatList(data, 'topLevel', 'childz');

        expect(
            actual.toJS().map(i => ({ _id: i._id, _parentId: i._parentId }))
        ).toEqual([
            {
                _id: -1,
                _parentId: 'root'
            },
            {
                _id: 1,
                _parentId: -1
            },
            {
                _id: 11,
                _parentId: 1
            }
        ]);

    });

    it('Should throw an error if no data is passed', () => {
        expect(() => { treeToFlatList(); })
            .toThrow('Expected data to be defined');
    });

    it('Should pass data along with constructed nodes', () => {

        const data = {
            topLevel: {
                id: -1,
                childz: [
                    {
                        id: 1,
                        specialData: 'someProp',
                        parentId: -1
                    },
                    {
                        id: 2,
                        parentId: -1,
                        code: 'banana',
                        childz: [
                            {
                                id: 21,
                                parentId: 2
                            }
                        ]
                    }
                ]
            }
        };

        const actual = treeToFlatList(data, 'topLevel', 'childz').toJS();

        expect(actual[1]).toInclude({ specialData: 'someProp' });
        expect(actual[2]).toInclude({ code: 'banana' });
    });

});
