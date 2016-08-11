'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var setTreeValue = exports.setTreeValue = function setTreeValue(treeData, path, values) {
    var childIdentifier = arguments.length <= 3 || arguments[3] === undefined ? 'children' : arguments[3];
    var rootIdentifier = arguments.length <= 4 || arguments[4] === undefined ? 'root' : arguments[4];


    var lookingFor = path[path.length - 1];
    var node = treeData[rootIdentifier];

    var firstId = path.shift();

    if (node.id === firstId) {

        while (path.length > 0 && node) {

            if (node && node.id !== lookingFor && node[childIdentifier]) {
                (function () {

                    var nextId = path.shift();
                    node = node[childIdentifier].find(function (n) {
                        return n.id === nextId;
                    });
                })();
            } else {
                node = null;
            }
        }
    }

    if (node) {
        node = Object.assign(node, values);
    }

    return treeData;
};