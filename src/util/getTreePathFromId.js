export const getTreePathFromId = (flatData, id) => {
    const res = [];
    const node = flatData.find(n => n.get('_id') === id);

    let lastParentId = node.get('_id');

    while (lastParentId !== undefined) {
        const parent = flatData.find(n => n.get('_id') === lastParentId);

        if (parent) {
            res.push(parent.get('_id'));
            lastParentId = parent.get('_parentId');
        }

        else {
            lastParentId = undefined;
        }
    }

    return res.reverse();
};
