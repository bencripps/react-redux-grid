/* eslint-enable describe it sinon */

import expect from 'expect';

import {
    getTreePathFromId
} from './../../src/util/getTreePathFromId';

import {
    treeToFlatList
} from './../../src/util/treeToFlatList';

describe('the getTreePathFromId utility', () => {

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

        const flat = treeToFlatList(data);

        expect(
            getTreePathFromId(flat, 121)
        ).toEqual([-1, 1, 12, 121]);
    });

});
