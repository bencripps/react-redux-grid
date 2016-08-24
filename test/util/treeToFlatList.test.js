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
            treeToFlatList(data)
        ).toEqual([
            {
                _id: -1,
                _parentId: 'root',
                _depth: 0,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 0,
                _isExpanded: true
            },
            {
                _id: 1,
                _parentId: -1,
                _depth: 1,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 0,
                _isExpanded: true
            },
            {
                _id: 11,
                _parentId: 1,
                _depth: 2,
                _leaf: true,
                _hideChildren: undefined,
                _hasChildren: undefined,
                _index: 0,
                _isExpanded: undefined
            },
            {
                _id: 12,
                _parentId: 1,
                _depth: 2,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 1,
                _isExpanded: true
            },
            {
                _id: 121,
                _parentId: 12,
                _depth: 3,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 0,
                _isExpanded: true
            },
            {
                _id: 1211,
                _parentId: 121,
                _depth: 4,
                _leaf: true,
                _hideChildren: undefined,
                _hasChildren: undefined,
                _index: 0,
                _isExpanded: undefined
            },
            {
                _id: 2,
                _parentId: -1,
                _depth: 1,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 1,
                _isExpanded: true
            },
            {
                _id: 21,
                _parentId: 2,
                _depth: 2,
                _leaf: true,
                _hideChildren: undefined,
                _hasChildren: undefined,
                _index: 0,
                _isExpanded: undefined
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
                            },
                            {
                                id: 12,
                                parentId: 1,
                                childz: [
                                    {
                                        id: 121,
                                        parentId: 12,
                                        childz: [
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

        expect(
            treeToFlatList(data, 'topLevel', 'childz')
        ).toEqual([
            {
                _id: -1,
                _parentId: 'root',
                _depth: 0,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 0,
                _isExpanded: true
            },
            {
                _id: 1,
                _parentId: -1,
                _depth: 1,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 0,
                _isExpanded: true
            },
            {
                _id: 11,
                _parentId: 1,
                _depth: 2,
                _leaf: true,
                _hideChildren: undefined,
                _hasChildren: undefined,
                _index: 0,
                _isExpanded: undefined
            },
            {
                _id: 12,
                _parentId: 1,
                _depth: 2,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 1,
                _isExpanded: true
            },
            {
                _id: 121,
                _parentId: 12,
                _depth: 3,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 0,
                _isExpanded: true
            },
            {
                _id: 1211,
                _parentId: 121,
                _depth: 4,
                _leaf: true,
                _hideChildren: undefined,
                _hasChildren: undefined,
                _index: 0,
                _isExpanded: undefined
            },
            {
                _id: 2,
                _parentId: -1,
                _depth: 1,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 1,
                _isExpanded: true
            },
            {
                _id: 21,
                _parentId: 2,
                _depth: 2,
                _leaf: true,
                _hideChildren: undefined,
                _hasChildren: undefined,
                _index: 0,
                _isExpanded: undefined
            }
        ]);

    });

    it('Should pass data along with constructed nodes', () => {

        const data = {
            topLevel: {
                id: -1,
                childz: [
                    {
                        id: 1,
                        specialData: 'someProp',
                        parentId: -1,
                        childz: [
                            {
                                id: 11,
                                parentId: 1
                            },
                            {
                                id: 12,
                                parentId: 1,
                                childz: [
                                    {
                                        id: 121,
                                        parentId: 12,
                                        childz: [
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

        expect(
            treeToFlatList(data, 'topLevel', 'childz')
        ).toEqual([
            {
                _id: -1,
                _parentId: 'root',
                _depth: 0,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 0,
                _isExpanded: true
            },
            {
                _id: 1,
                specialData: 'someProp',
                _parentId: -1,
                _depth: 1,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 0,
                _isExpanded: true
            },
            {
                _id: 11,
                _parentId: 1,
                _depth: 2,
                _leaf: true,
                _hideChildren: undefined,
                _hasChildren: undefined,
                _index: 0,
                _isExpanded: undefined
            },
            {
                _id: 12,
                _parentId: 1,
                _depth: 2,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 1,
                _isExpanded: true
            },
            {
                _id: 121,
                _parentId: 12,
                _depth: 3,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 0,
                _isExpanded: true
            },
            {
                _id: 1211,
                _parentId: 121,
                _depth: 4,
                _leaf: true,
                _hideChildren: undefined,
                _hasChildren: undefined,
                _index: 0,
                _isExpanded: undefined
            },
            {
                _id: 2,
                _parentId: -1,
                code: 'banana',
                _depth: 1,
                _leaf: false,
                _hideChildren: undefined,
                _hasChildren: true,
                _index: 1,
                _isExpanded: true
            },
            {
                _id: 21,
                _parentId: 2,
                _depth: 2,
                _leaf: true,
                _hideChildren: undefined,
                _hasChildren: undefined,
                _index: 0,
                _isExpanded: undefined
            }
        ]);

    });

});
