export const setTreeValue = (
    treeData,
    path,
    values,
    childIdentifier = 'children',
    rootIdentifier = 'root'
) => {

    const lookingFor = path[path.length - 1];
    let node = treeData[rootIdentifier];

    const firstId = path.shift();

    if (node.id === firstId) {

        while (path.length > 0 && node) {

            if (node
                && node.id !== lookingFor
                && node[childIdentifier]) {

                const nextId = path.shift();
                node = node[childIdentifier].find(n => n.id === nextId);
            }

            else {
                node = null;
            }
        }
    }

    if (node) {
        node = Object.assign(node, values);
    }

    return treeData;
};
