'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findTreeNode = undefined;

var _immutable = require('immutable');

var findTreeNode = exports.findTreeNode = function findTreeNode(treeData, path) {
    var childIdentifier = arguments.length <= 2 || arguments[2] === undefined ? 'children' : arguments[2];
    var rootIdentifier = arguments.length <= 3 || arguments[3] === undefined ? 'root' : arguments[3];


    if (!_immutable.Map.isMap(treeData)) {
        treeData = (0, _immutable.fromJS)(treeData);
    }

    if (!_immutable.List.isList(path)) {
        path = (0, _immutable.fromJS)(path);
    }

    var lookingFor = path.last();

    var node = treeData.get(rootIdentifier);
    var indexPath = [rootIdentifier];

    var firstId = path.first();
    path = path.shift();

    if (node.get('id') === firstId) {

        while (path.count() > 0 && node) {

            if (node && node.get('id') !== lookingFor && node.get(childIdentifier)) {
                (function () {

                    var nextId = path.first();
                    path = path.shift();

                    var nodeIndex = node.get(childIdentifier).findIndex(function (n) {
                        return n.get('id') === nextId;
                    });
                    node = node.getIn([childIdentifier, nodeIndex]);
                    indexPath.push(childIdentifier);
                    indexPath.push(nodeIndex);
                })();
            } else {
                node = null;
            }
        }
    }

    return { node: node, indexPath: indexPath };
};