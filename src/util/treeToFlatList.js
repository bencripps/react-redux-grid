export const treeToFlatList = (
    data,
    rootIdentifier = 'root',
    childIdentifier = 'children',
    list = [],
    currentDepth = 1,
    path = [-1]
) => {

    if (!data) {
        throw new Error('Expected data to be defined');
    }

    if (data[rootIdentifier]) {

        list.push(getItem(data[rootIdentifier], childIdentifier, 0));

        if (data[rootIdentifier][childIdentifier]) {
            treeToFlatList(
                data[rootIdentifier][childIdentifier],
                rootIdentifier,
                childIdentifier,
                list
            );
        }
    }

    else {

        path = [...path];
        data.forEach((node, index) => {

            list.push(
                getItem(node, childIdentifier, currentDepth, index, [...path])
            );

            path.push(node.id);

            if (node[childIdentifier]
                && !node._hideChildren
                && node[childIdentifier].length > 0) {
                currentDepth++;
                treeToFlatList(
                    node[childIdentifier],
                    rootIdentifier,
                    childIdentifier,
                    list,
                    currentDepth,
                    path

                );
                currentDepth--;
            }

        });
    }

    return list;
};

export const treeToFlatList2 = (
    data,
    rootIdentifier = 'root',
    childIdentifier = 'children'
) => {

    if (!data) {
        throw new Error('Expected data to be defined');
    }

    if (data[rootIdentifier]) {
        data = data[rootIdentifier];
    }
}

const getItem = (node, childIdentifier, depth, index = 0, path = [-1]) => {

    const child = {
        ...node,
        [childIdentifier]: null,
        _id: node.id,
        _parentId: node.parentId === undefined ? 'root' : node.parentId,
        _depth: depth,
        _hideChildren: node._hideChildren,
        _hasChildren: node[childIdentifier] && node[childIdentifier].length > 0,
        _index: index,
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

    // removing erroneous data since grid uses internal values

    delete child[childIdentifier];
    delete child.parentId;
    delete child.id;

    return child;
};
