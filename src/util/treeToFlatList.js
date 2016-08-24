export const treeToFlatList = (
    data,
    rootIdentifier = 'root',
    childIdentifier = 'children',
    list = [],
    currentDepth = 0
) => {

    if (!data) {
        throw new Error('Expected data to be defined');
    }

    if (data[rootIdentifier]) {
        list.push(getItem(data[rootIdentifier], childIdentifier, currentDepth));
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

        if (currentDepth === 0) {
            currentDepth = 1;
        }

        data.forEach((node, index) => {

            list.push(getItem(node, childIdentifier, currentDepth, index));

            if (node[childIdentifier]
                && !node._hideChildren
                && node[childIdentifier].length > 0) {
                currentDepth++;
                treeToFlatList(
                    node[childIdentifier],
                    rootIdentifier,
                    childIdentifier,
                    list,
                    currentDepth
                );
                currentDepth--;
            }

        });
    }

    return list;
};

const getItem = (node, childIdentifier, depth, index = 0) => {

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
        )
    };

    // removing erroneous data since grid uses internal values

    delete child[childIdentifier];
    delete child.parentId;
    delete child.id;

    return child;
};
