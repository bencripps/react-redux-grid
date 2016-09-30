'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setTreeValue = undefined;

var _findTreeNode2 = require('./findTreeNode');

var setTreeValue = exports.setTreeValue = function setTreeValue(treeData, path, values) {
    var childIdentifier = arguments.length <= 3 || arguments[3] === undefined ? 'children' : arguments[3];
    var rootIdentifier = arguments.length <= 4 || arguments[4] === undefined ? 'root' : arguments[4];

    var _findTreeNode = (0, _findTreeNode2.findTreeNode)(treeData, path, childIdentifier, rootIdentifier);

    var node = _findTreeNode.node;
    var indexPath = _findTreeNode.indexPath;


    return !node ? treeData : treeData.mergeIn(indexPath, values);
};