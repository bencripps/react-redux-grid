'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setTreeValue = undefined;

var _findTreeNode = require('./findTreeNode');

var setTreeValue = exports.setTreeValue = function setTreeValue(treeData, path, values) {
    var childIdentifier = arguments.length <= 3 || arguments[3] === undefined ? 'children' : arguments[3];
    var rootIdentifier = arguments.length <= 4 || arguments[4] === undefined ? 'root' : arguments[4];


    var node = (0, _findTreeNode.findTreeNode)(treeData, path, childIdentifier, rootIdentifier);

    if (node) {
        Object.assign(node, values);
    }

    return treeData;
};