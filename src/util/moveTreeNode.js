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
    const currentParent = findTreeNode(
        treeData,
        currentPath,
        childIdentifier,
        rootIdentifier
    );

    const nextParent = findTreeNode(
        treeData,
        nextPath,
        childIdentifier,
        rootIdentifier
    );

    if (!currentParent || !nextParent) {
        return treeData;
    }

    const node = currentParent[childIdentifier].splice(
        currentIndex,
        1
    )[0];

    if (!Array.isArray(nextParent[childIdentifier])) {
        nextParent[childIdentifier] = [];
    }

    nextParent[childIdentifier].splice(nextIndex, 0, node);

    return treeData;
};
