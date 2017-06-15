import { List, Map, fromJS } from 'immutable';

export const treeToFlatList = (
    data,
    rootIdentifier = 'root',
    childIdentifier = 'children'
) => {

    if (!data) {
        throw new Error('Expected data to be defined');
    }

    const result = [];
    const cfg = { flatIndex: 0 };
    let stack = List();

    if (!Map.isMap(data)) {
        data = fromJS(data);
    }

    if (data.get(rootIdentifier)) {
        data = data.get(rootIdentifier);

        stack = stack.push(
            toItem(List(), childIdentifier, cfg)(data)
        );
    }
    else {
        stack = data.get(childIdentifier).map(
            toItem(List([-1]), List([0]), childIdentifier)
        );
    }

    while (stack.count()) {

        const item = stack.first();
        const children = item.get(childIdentifier);

        stack = stack.shift();

        if (List.isList(children) && !item.get('_hideChildren')) {
            stack = children.map(
                toItem(
                    item.get('_path').push(item.get('_id')),
                    childIdentifier,
                    cfg,
                    item,
                    children
                )
            ).concat(stack);
        }

        // removing erroneous data since grid uses internal values
        result.push(
            item.delete(childIdentifier)
                .delete('parentId')
                .delete('id')
        );
    }

    return List(result);
};

const toItem = (
    path, childIdentifier, cfg, parent, siblings = List()
) => (node, index = 0) => {

    const previousSibling = index - 1 > -1
        ? siblings.get(index - 1)
        : undefined;

    const previousSiblingTotalChilden = (
        previousSibling && previousSibling.get(childIdentifier)
            ? previousSibling.get(childIdentifier).count()
            : 0
    );

    return node.merge({
        _id: node.get('id'),
        _parentId: node.get('parentId', 'root'),
        _parentIndex: parent ? parent.get('_index') : 0,
        _depth: path.count(),
        _hideChildren: node.get('_hideChildren'),
        _hasChildren: (
            node.get(childIdentifier) && node.get(childIdentifier).count() > 0
        ),
        _index: index,
        _flatIndex: cfg.flatIndex++,
        _isFirstChild: index === 0,
        _isLastChild: index === siblings.count() - 1,
        _previousSiblingId: previousSibling
            ? previousSibling.get('id')
            : undefined,
        _previousSiblingTotalChilden: previousSiblingTotalChilden,
        _key: `tree-item-${node.get('id')}`,
        _isExpanded: (
            node.get(childIdentifier)
                && node.get(childIdentifier).count() > 0
                && !node.get('_hideChildren')
        ),
        _leaf: !(
            (node.get(childIdentifier) && node.get(childIdentifier).count() > 0)
            || (node.get('leaf') !== undefined && node.get('leaf') === false)
        ),
        _path: path
    });

};
