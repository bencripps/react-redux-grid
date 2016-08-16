export const getTreePathFromId = (flatData, id) => {
    const res = [];
    const node = flatData.find(n => n._id === id);

    let lastParentId = node._id;

    while (lastParentId !== undefined) {
        const parent = flatData.find(n => n._id === lastParentId);

        if (parent) {
            res.push(parent._id);
            lastParentId = parent._parentId;
        }

        else {
            lastParentId = undefined;
        }
    }

    return res.reverse();
};
