/* eslint-enable describe it sinon */
import expect from 'expect';

import {
    moveTreeNode
} from './../../src/util/moveTreeNode';

describe('the moveTreeNode utility', () => {

    it('should change the order of sibilings', () => {

        expect(
            moveTreeNode(
                {
                    root: {
                        id: -1,
                        children: [
                            { id: 1, parentId: -1 },
                            { id: 2, parentId: -1 },
                            { id: 3, parentId: -1 }
                        ]
                    }
                },
                2,
                [-1],
                0,
                [-1]
            )
        ).toEqual({
            root: {
                id: -1,
                children: [
                    { id: 3, parentId: -1 },
                    { id: 1, parentId: -1 },
                    { id: 2, parentId: -1 }
                ]
            }
        });
    });

    it('should move nodes to new parents', () => {

        expect(
            moveTreeNode(
                {
                    root: {
                        id: -1,
                        children: [
                            {
                                id: 1,
                                parentId: -1,
                                children: [
                                    { id: 11, parentId: 1 },
                                    { id: 12, parentId: 1 },
                                    { id: 13, parentId: 1 }
                                ]
                            },
                            { id: 2, parentId: -1 },
                            { id: 3, parentId: -1 }
                        ]
                    }
                },
                0,
                [-1],
                0,
                [-1, 2]
            )
        ).toEqual({
            root: {
                id: -1,
                children: [
                    {
                        id: 2,
                        parentId: -1,
                        children: [
                            {
                                id: 1,
                                parentId: 2,
                                children: [
                                    { id: 11, parentId: 1 },
                                    { id: 12, parentId: 1 },
                                    { id: 13, parentId: 1 }
                                ]
                            }
                        ]
                    },
                    { id: 3, parentId: -1 }
                ]
            }
        });

    });

});
