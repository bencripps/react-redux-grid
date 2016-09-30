import { List, Map, fromJS } from 'immutable';

export const findTreeNode = (
    treeData,
    path,
    childIdentifier = 'children',
    rootIdentifier = 'root'
) => {

    if (!Map.isMap(treeData)) {
        treeData = fromJS(treeData);
    }

    if (!List.isList(path)) {
        path = fromJS(path);
    }

    const lookingFor = path.last();

    let node = treeData.get(rootIdentifier);
    const indexPath = [rootIdentifier];

    const firstId = path.first();
    path = path.shift();

    if (node.get('id') === firstId) {

        while (path.count() > 0 && node) {

            if (node
                && node.get('id') !== lookingFor
                && node.get(childIdentifier)) {

                const nextId = path.first();
                path = path.shift();

                const nodeIndex = node.get(childIdentifier)
                    .findIndex(n => n.get('id') === nextId);
                node = node.getIn([childIdentifier, nodeIndex]);
                indexPath.push(childIdentifier);
                indexPath.push(nodeIndex);
            }

            else {
                node = null;
            }
        }
    }

    return { node, indexPath };
};
