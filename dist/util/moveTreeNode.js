'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.moveTreeNode = undefined;

var _immutable = require('immutable');

var _findTreeNode3 = require('./findTreeNode');

var moveTreeNode = exports.moveTreeNode = function moveTreeNode(treeData, currentIndex, currentPath, nextIndex, nextPath) {
    var childIdentifier = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'children';
    var rootIdentifier = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'root';


    var originalTreeData = treeData;

    var _findTreeNode = (0, _findTreeNode3.findTreeNode)(treeData, currentPath, childIdentifier, rootIdentifier);

    var currentParent = _findTreeNode.node;
    var currentIndexPath = _findTreeNode.indexPath;


    if (!currentParent) {
        return originalTreeData;
    }

    currentIndexPath.push.apply(currentIndexPath, [childIdentifier, currentIndex]);

    var node = treeData.getIn(currentIndexPath);
    treeData = treeData.deleteIn(currentIndexPath);

    var _findTreeNode2 = (0, _findTreeNode3.findTreeNode)(treeData, nextPath, childIdentifier, rootIdentifier);

    var nextParent = _findTreeNode2.node;
    var nextIndexPath = _findTreeNode2.indexPath;


    if (!nextParent) {
        return originalTreeData;
    }

    nextIndexPath.push(childIdentifier);

    if (!_immutable.List.isList(treeData.getIn(nextIndexPath))) {
        treeData = treeData.setIn(nextIndexPath, (0, _immutable.List)());
    }

    node = node.set('parentId', nextPath.last());

    treeData = treeData.setIn(nextIndexPath, treeData.getIn(nextIndexPath).insert(nextIndex, node));

    return treeData;
};