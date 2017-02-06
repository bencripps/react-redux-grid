'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setTreeValue = undefined;

var _findTreeNode2 = require('./findTreeNode');

var setTreeValue = exports.setTreeValue = function setTreeValue(treeData, path, values) {
    var childIdentifier = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';
    var rootIdentifier = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'root';

    var _findTreeNode = (0, _findTreeNode2.findTreeNode)(treeData, path, childIdentifier, rootIdentifier),
        node = _findTreeNode.node,
        indexPath = _findTreeNode.indexPath;

    return !node ? treeData : treeData.mergeIn(indexPath, values);
};