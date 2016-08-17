import { findTreeNode } from './findTreeNode';

export const setTreeValue = (
    treeData,
    path,
    values,
    childIdentifier = 'children',
    rootIdentifier = 'root'
) => {

    const node = findTreeNode(treeData, path, childIdentifier, rootIdentifier);

    if (node) {
        Object.assign(node, values);
    }

    return treeData;
};
