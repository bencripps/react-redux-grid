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
                            { id: 1 },
                            { id: 2 },
                            { id: 3 }
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
                    { id: 3 },
                    { id: 1 },
                    { id: 2 }
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
                                children: [
                                    { id: 11 },
                                    { id: 12 },
                                    { id: 13 }
                                ]
                            },
                            { id: 2 },
                            { id: 3 }
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
                        children: [
                            {
                                id: 1,
                                children: [
                                    { id: 11 },
                                    { id: 12 },
                                    { id: 13 }
                                ]
                            }
                        ]
                    },
                    { id: 3 }
                ]
            }
        });

    });

});
