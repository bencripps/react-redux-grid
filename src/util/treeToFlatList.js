export const treeToFlatList = (
    data,
    rootIdentifier = 'root',
    childIdentifier = 'children'
) => {

    if (!data) {
        throw new Error('Expected data to be defined');
    }

    const result = [];

    let stack = [];

    if (data[rootIdentifier]) {
        data = data[rootIdentifier];

        stack.push(
            toItem([], [], childIdentifier)(data)
        );
    }
    else {
        stack = data[childIdentifier].map(toItem([-1], [0], childIdentifier));
    }

    while (stack.length) {

        const item = stack.shift();
        const { [childIdentifier]: children } = item;

        if (Array.isArray(children) && !item._hideChildren) {
            stack = children.map(
                toItem(
                    [...item._path, item._id],
                    item._indexPath,
                    childIdentifier,
                    item,
                    children
                )
            ).concat(stack);
        }

        result.push(item);

        // removing erroneous data since grid uses internal values
        delete item[childIdentifier];
        delete item.parentId;
        delete item.id;
    }

    return result;
};

const toItem = (
    path, indexPath, childIdentifier, parent, siblings = []
) => (node, index = 0) => {

    const previousSibling = siblings[index - 1] !== undefined
        ? siblings[index - 1]
        : undefined;

    const previousSiblingTotalChilden = previousSibling
        && previousSibling.children
        ? previousSibling.children.length
        : 0;

    const parentTotalChildren = parent && Array.isArray(parent.children)
        ? parent.children.length
        : 0;

    const previousSiblingChildIds = previousSiblingTotalChilden > 0
        ? previousSibling.children.map(child => child.id)
        : [];

    return {
        ...node,
        _id: node.id,
        _parentId: node.parentId === undefined ? 'root' : node.parentId,
        _parentIndex: parent ? parent._index : 0,
        _parentTotalChildren: parentTotalChildren,
        _depth: path.length,
        _hideChildren: node._hideChildren,
        _hasChildren: node[childIdentifier] && node[childIdentifier].length > 0,
        _indexPath: [...indexPath, index],
        _index: index,
        _isFirstChild: index === 0,
        _isLastChild: index === siblings.length - 1,
        _previousSiblingId: previousSibling ? previousSibling.id : undefined,
        _previousSiblingTotalChilden: previousSiblingTotalChilden,
        _previousSiblingChildIds: previousSiblingChildIds,
        _key: `tree-item-${node.id}`,
        _isExpanded: (
            node[childIdentifier]
                && node[childIdentifier].length > 0
                && !node._hideChildren
        ),
        _leaf: !(
            (node[childIdentifier] && node[childIdentifier].length > 0)
            || (node.leaf !== undefined && node.leaf === false)
        ),
        _path: path
    };

};
