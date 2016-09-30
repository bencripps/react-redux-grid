import { findTreeNode } from './findTreeNode';

export const setTreeValue = (
    treeData,
    path,
    values,
    childIdentifier = 'children',
    rootIdentifier = 'root'
) => {

    const {
        node,
        indexPath
    } = findTreeNode(treeData, path, childIdentifier, rootIdentifier);

    return !node ? treeData : treeData.mergeIn(indexPath, values);
};
