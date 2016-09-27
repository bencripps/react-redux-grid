'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findTreeNode = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _arrayFrom2.default)(arr); } }

var findTreeNode = exports.findTreeNode = function findTreeNode(treeData, path) {
    var childIdentifier = arguments.length <= 2 || arguments[2] === undefined ? 'children' : arguments[2];
    var rootIdentifier = arguments.length <= 3 || arguments[3] === undefined ? 'root' : arguments[3];

    path = [].concat(_toConsumableArray(path));
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

    return node;
};