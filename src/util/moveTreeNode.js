import { List } from 'immutable';

import { findTreeNode } from './findTreeNode';

export const moveTreeNode = (
    treeData,
    currentIndex,
    currentPath,
    nextIndex,
    nextPath,
    childIdentifier = 'children',
    rootIdentifier = 'root'
) => {

    const originalTreeData = treeData;

    const { node: currentParent, indexPath: currentIndexPath } = findTreeNode(
        treeData,
        currentPath,
        childIdentifier,
        rootIdentifier
    );

    if (!currentParent) {
        return originalTreeData;
    }

    currentIndexPath.push(...[childIdentifier, currentIndex]);

    let node = treeData.getIn(currentIndexPath);
    treeData = treeData.deleteIn(currentIndexPath);

    const { node: nextParent, indexPath: nextIndexPath } = findTreeNode(
        treeData,
        nextPath,
        childIdentifier,
        rootIdentifier
    );

    if (!nextParent) {
        return originalTreeData;
    }

    nextIndexPath.push(childIdentifier);

    if (!List.isList(treeData.getIn(nextIndexPath))) {
        treeData = treeData.setIn(nextIndexPath, List());
    }

    node = node.set('parentId', nextPath.last());

    treeData = treeData.setIn(
        nextIndexPath,
        treeData.getIn(nextIndexPath).insert(nextIndex, node)
    );

    return treeData;
};
