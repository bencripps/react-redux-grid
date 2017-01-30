/* eslint-enable describe it sinon */
import expect from 'expect';
import { fromJS } from 'immutable';

import {
    findTreeNode
} from './../../src/util/findTreeNode';

describe('the findTreeNode utility', () => {
    const treeData = fromJS({
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
    });

    it('should find root node', () => {

        const { node, indexPath } = findTreeNode(
            treeData,
            [-1]
        );

        expect(
            node.get('id')
        ).toBe(-1, 'Did not find root');

        expect(
            indexPath
        ).toEqual(['root']);

    });

    it('should find root child nodes', () => {
        const { node, indexPath } = findTreeNode(
            treeData,
            [-1, 1]
        );

        expect(
            node.get('id')
        ).toBe(1, 'Got invalid id %s, expected %s');

        expect(
            indexPath
        ).toEqual(['root', 'children', 0]);
    });

    it('should find root child nodes', () => {
        const { node, indexPath } = findTreeNode(
            treeData,
            [-1, 1, 11]
        );

        expect(
            node.get('id')
        ).toBe(11);

        expect(
            indexPath
        ).toEqual(['root', 'children', 0, 'children', 0]);
    });

    it('should find root child nodes', () => {
        const { node, indexPath } = findTreeNode(
            treeData,
            [-1, 2, 21]
        );

        expect(
            node.get('id')
        ).toBe(21);

        expect(
            indexPath
        ).toEqual(['root', 'children', 1, 'children', 0]);
    });

    it('should find root child nodes', () => {
        const { node, indexPath } = findTreeNode(
            treeData,
            [-1, 1, 12, 121, 1211]
        );

        expect(
            node.get('id')
        ).toBe(1211);

        expect(
            indexPath
        ).toEqual(
            ['root', 'children', 0, 'children', 1, 'children', 0, 'children', 0]
        );
    });
});
