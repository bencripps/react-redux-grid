'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.moveTreeNode = undefined;

var _findTreeNode = require('./findTreeNode');

var moveTreeNode = exports.moveTreeNode = function moveTreeNode(treeData, currentIndex, currentPath, nextIndex, nextPath) {
    var childIdentifier = arguments.length <= 5 || arguments[5] === undefined ? 'children' : arguments[5];
    var rootIdentifier = arguments.length <= 6 || arguments[6] === undefined ? 'root' : arguments[6];

    var currentParent = (0, _findTreeNode.findTreeNode)(treeData, currentPath, childIdentifier, rootIdentifier);

    var nextParent = (0, _findTreeNode.findTreeNode)(treeData, nextPath, childIdentifier, rootIdentifier);

    if (!currentParent || !nextParent) {
        return treeData;
    }

    var node = currentParent[childIdentifier].splice(currentIndex, 1)[0];

    if (!Array.isArray(nextParent[childIdentifier])) {
        nextParent[childIdentifier] = [];
    }

    nextParent[childIdentifier].splice(nextIndex, 0, node);

    node.parentId = nextPath[nextPath.length - 1];

    return treeData;
};